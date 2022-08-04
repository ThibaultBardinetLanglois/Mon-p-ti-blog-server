const { log } = require("console");

const jwt = require("jsonwebtoken"),
    serverSecret = process.env.SERVER_SECRET
    fs = require('fs'),
    userModel = require("../models/user.model"),
    postModel = require("../models/post.model"),
    FileUploader = require('../utils/uploadFile.utils'),
    utils = require('../utils/utils');


// AUTHENTICATION
exports.register = async (req, res) => {
    await userModel.createUser(req.body.name, req.body.email, req.body.password)
        .then(response => {
            return response.insertId
        })
        .then(insertId => {
            return userModel.getUserById(insertId)
        })
        .then(([user]) => {
            // Do not forget to delete the password before sending user informations to the frontend
            delete user.password
            delete user.csrf_token
            user = {...user}
            user.created_at = utils.formatDate(new Date(user.created_at))
            const token = jwt.sign(user, serverSecret, { expiresIn: "24h" })
            return res
                .status(201)
                .json(
                    {
                        message: `L'utilisateur ${user.name} a été créé avec succes, vous êtes actuellement connecté`,
                        token: token, 
                        user: user
                    }
                )
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message})
        })
}


exports.login = async (req, res) => {
    // If user exist we have to compare the password entered by user with the one stored in the database, if passwords match we set a new connexion timestamp for last_connexion and return res with a new token and user informations
        
    // Set the last_connection in the database for the user
    await userModel.setConnectionTimestamp(req.body.email)
        .then(response => {
            return res.
                status(200)
                .json(
                    { 
                        token: req.createdToken, 
                        user: req.userInDB 
                    }
                )
        })
        .catch(err => {
            console.log("Error => ", err)
            return res.
                status(500)
                .json(
                    { 
                        error: "Erreur lors de la connexion" 
                    }
                )
        })
}

// check if token is valid for the frontend's state
exports.checkToken = async (req, res) => {
    if (!req.decodedToken) {
       return res
        .status(401)
        .json(
            {
                code:"token",  
                message: "Token invalide!"
            }
        ) 
    } 

    if (req.decodedToken?.created_at) {
        req.decodedToken.created_at = utils.formatDate(req.decodedToken.created_at)
    }

    if (req.decodedToken?.last_connection) {
        req.decodedToken.last_connection = utils.formatDate(req.decodedToken?.last_connection)
    }
    res.status(200).json({decryptedToken: req.decodedToken})
}


// get particular users
exports.getAllForFilteredSearch = async (req, res) => {
    if (!req?.decodedToken.id) {
        return res
            .status(400)
            .json(
                { 
                    message: "Votre requête ne contient pas les bons champs" 
                }
            )
    } 

    if (typeof req.decodedToken.id !== 'number') {
        return res
            .status(406)
            .json(
                {
                    message: "Le champ fourni n'est pas du bon type"
                }
            )
    }

    const users = await userModel.getAllForFilteredSearch(req.decodedToken.id)
    if (users.code) {
        return res
            .status(500)
            .json(
                { 
                    error: "Erreur interne au server de base de données" 
                }
            )
    } 

    return res.status(200).send(users)
}

exports.getUserByName = async (req, res) => {
    delete req.userInDB.password
    req.userInDB.created_at = utils.formatDate(req.userInDB.created_at)
    req.userInDB.last_connection = utils.formatDate(req.userInDB.last_connection)
    return res.status(200).send(req.userInDB)
}


// Edit and delete

exports.editUser = async (req, res) => {
    console.log("Edited infos user in req body =>", req.body)
    // if the req.filename is null and the ancient is not null, the ancient file is not deleted and we keep the ancient name
    // if the req.filename is null and ancien file is null, we set the new file name to null and we don't delete anything
    // if the req.filename is not null and the ancient is null, we set the new file name and don't delete non-existent img
    // else, so if the req.filename && the ancient are not null, we set the new file name and delete the existent pic to replace it by the new
    let renouveledFileName,
        deleteFile,
        fileNameToDelete;
    if (!req.filename && req.userInDB.image) {
        renouveledFileName = req.userInDB.image
    } else if (!req.filename && !req.userInDB.image) {
        renouveledFileName = null
    } else if (req.filename && !req.userInDB.image) {
        renouveledFileName = req.filename
    } else {
        // Stock new file in req
        renouveledFileName = req.filename
        deleteFile = true
        // delete ancient file
        fileNameToDelete = req.userInDB.image
    }

    req.body.image = renouveledFileName
    console.log(req.body, deleteFile, fileNameToDelete, req.imgProfile)

    await userModel.editUser(req.body)
        .then(response => {
            // Move the image file to a folder in the backend server and if an image already exist for the user we have to delete it
            if (req.filename) {
                req.imgProfile.mv("public/uploads/profile/" + req.filename, function (err) {
                    if (err) {
                        return res.status(500).json({ error: "Il y a eu une erreur, l'image n'a pas été déplacée" })
                    }
                    if (deleteFile) {
                        fs.unlink("public/uploads/profile/" + fileNameToDelete, (err) => {
                            if (err) {
                                console.error(err)
                                return res.status(500).json({ err: err })
                            }
                        })
                        
                    }
                })
            } 

            return res
                .status(201)
                .json(
                    { 
                        message: "Le profil a changé!" 
                    }
                )
        })
        .catch(err => {
            console.log("ERR =>", err)
            res.status(500).send("Connection problem")
        })
}

exports.deleteUser = async (req, res) => {
    let [user] = await userModel.getUserById(req.params.userId)
    console.log("User to delete =>", user)

    // to delete imgs in public/uploads/posts/ directory we have to grap all the posts ids related to the user and for each get all imgs associated with it, to loop through and delete it
    let postsByUser = await userModel.getAllPostsByUser(req.params.userId)
    console.log("ALL posts for the user =>", postsByUser)

    let postsIdArray = []
    let imagesNamesArray = []
    if (postsByUser.length) {
        for (let i = 0; i < postsByUser.length; i++) {
            console.log("post mapped =>", postsByUser[i])
            postsIdArray.push(postsByUser[i].id)
            
        }

        // select all images by posts ids and stock their name in an array
        for (let i = 0; i < postsIdArray.length; i++) {
            await postModel.getAllImagesByPost(postsIdArray[i])
                .then(imgs => {
                    for (let i = 0; i < imgs.length; i++) {
                        imagesNamesArray.push(imgs[i].name)
                    }
                })
                .catch(err => console.log(err))
        }
    }
    
    // Delete image profile and posts images
    await userModel.deleteUser(req.params.userId)
        .then(response => {
            if (user?.image) {
                // Delete the user image profile if it exists
                FileUploader.deleteFile(user.image, 'image_profil')
            }
            if (imagesNamesArray.length) {
                FileUploader.deleteFiles(imagesNamesArray, 'posts_images')
            }
            return res
                .status(200)
                .json(
                    { 
                        message: `User avec le nom ${user?.name} a été supprimé` 
                    }
                )
        })
        .catch(err => {
            console.log("ERR =>", err)
            return res.status(500).send("Connection problem")
        })
}

// Get all for general user research

exports.getAllForGeneralResearch = async (req, res) => {
    const users = await userModel.getAllUnlessUserId(req.params.userId)
    if (users.code) {
        return res
            .status(500)
            .json(
                { 
                    error: "Erreur interne au server de base de données" 
                }
            )
    } 

    return res.status(200).send(users)
}