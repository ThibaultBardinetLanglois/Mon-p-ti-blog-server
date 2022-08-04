// File to verify the content in the database for all incoming request for the post controller
// If something is wrong we return a code and a message to the controller which in this case will return an appropriate response and code status by describing the error

const postModel = require("../../models/post.model"),
post_imgsModel = require("../../models/post_images.model");


exports.checkIfPostExistUsingParams = async (req, res, next) => {
  if (!req.params?.postId) {
    return res
      .status(400)
      .json(
        {
          message: "L'identifiant est introuvable dans les paramètres de la requête"
        }
      )
  }

  [postInDB] = await postModel.getPostById(req.params.postId)
  postInDB = {...postInDB}
  if (!Object.keys(postInDB).length) {
    return res
      .status(400)
      .json(
        {
          message: "Le post indiqué est introuvable en base de données"
        }
      )
  } else {
    req.postInDB = postInDB
  }

  next()
}

exports.checkIfPostExistUsingRequestBody = async (req, res, next) => {
  if (!req.body?.postId) {
    return res
      .status(400)
      .json(
        {
          message: "L'identifiant est introuvable dans le corps de la requête"
        }
      )
  }

  if (typeof req.body.postId !== "number") {
    return res
      .status(400)
      .json(
        {
          message: "L'identifiant fourni dans le corps de la requête n'est pas du bon type"
        }
      )
  }

  [postInDB] = await postModel.getPostById(req.body.postId)
  postInDB = {...postInDB}
  
  if (!Object.keys(postInDB).length) {
    return res
      .status(400)
      .json(
        {
          message: "Le post indiqué est introuvable en base de données"
        }
      )
  }

  if (postInDB.user_id !== req.decodedToken.id) {
    return res
      .status(403)
      .json(
        {
          message: "Vous n'êtes pas autorisé à supprimer des images de ce post"
        }
      )
  }
  
  req.postInDB = postInDB
  next()
}

exports.editPost = async (req, res, next) => {
  // Check if the personnal id in token and post match
  const [post] = await postModel.getPostById(req.body.postId)

  if (!Object.keys(post).length) {
    return res
      .status(400)
      .json(
        { 
          message: "Ce post n'existe pas en base de données" 
        }
      )
  }

  if (req.decodedToken.id !== post.user_id) {
    return res
      .status(403)
      .json(
        { 
          message: "Vous n'avez pas le droit d'éditer ce post" 
        }
      )
  }

  next()
}

exports.deletePost = async (req, res, next) => {
  // Check if the personnal id in token and post match
  const [post] = await postModel.getPostById(req.params.postId)

  if (!Object.keys(post).length) {
    return res
      .status(400)
      .json(
        { 
          message: "Ce post n'existe pas en base de données" 
        }
      )
  }

  if (req.decodedToken.id !== post.user_id) {
    return res
      .status(403)
      .json(
        { 
          message: "Vous n'avez pas le droit de supprimer ce post" 
        }
      )
  }

  next()
}



exports.retrieveImagesPerPost = async (req, res, next) => {
  // Because in this case the postId's value passed in the request body is type of string we have to check if it is string or not NaN when we converting it to a number
  if (!req.body?.postId) {
    return res
      .status(400)
      .json(
        {
          message: "L'identifiant est introuvable dans le corps de la requête"
        }
      )
  }

  if (isNaN(Number(req.body.postId))) {
    return res
      .status(400)
      .json(
        {
          message: "L'identifiant fourni dans le corps de la requête n'est pas du bon type"
        }
      )
  }

  [postInDB] = await postModel.getPostById(req.body.postId)
  postInDB = {...postInDB}
  
  if (!Object.keys(postInDB).length) {
    return res
      .status(400)
      .json(
        {
          message: "Le post indiqué est introuvable en base de données"
        }
      )
  }

  if (postInDB.user_id !== req.decodedToken.id) {
    return res
      .status(403)
      .json(
        {
          message: "Vous n'êtes pas autorisé à ajouter des images à ce post"
        }
      )
  }

  // Count the existing number of images for the post
  let imgsAlreadyExist = await post_imgsModel.getImagesByPost(req.body.postId),
    numberOfAlreadyExist;

  console.log("Images FOUND =>", imgsAlreadyExist)

  if(!imgsAlreadyExist.length) {
    numberOfAlreadyExist = 0
  } else {
    numberOfAlreadyExist = imgsAlreadyExist.length
  }
  
  // We pass the number of image and the images in the request
  req.postImgsCount = numberOfAlreadyExist

  next()
}

exports.deletePostImages = async (req, res, next) => {
  /* Check if images existe in database
  If yes add to an array and pass it to the request
  else return res.status(400)
  */
  let imagesToDelete = []
  for (let i = 0; i < req.body.imageIds.length; i++) {
    [image] = await post_imgsModel.getImageById(req.body.imageIds[i], req.body.postId)
    image = {...image}
    console.log("img =>", image)
    if (!Object.keys(image).length) {
      return res
        .status(400)
        .json(
          { 
            message: `${
              req.body.imageIds.length === 1 ? "L'image n'existe pas en base de données" : "Certaines images n'existent en base de données"
            }` 
          }
        )
    } else {
      imagesToDelete.push({...image})
    }

  }

  req.imagesToDelete = imagesToDelete
  
  next()
}