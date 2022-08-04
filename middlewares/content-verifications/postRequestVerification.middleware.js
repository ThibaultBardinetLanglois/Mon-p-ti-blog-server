// File to verify the content for all incoming request for the post controller
// Check the presence of the expected variables and their type
// Check their syntax with the regex.utils file if it is required
// If something is wrong we return a code and a message to the controller which in this case will return an appropriate response and code status by describing the error


const regexUtils = require('../../utils/regex.utils'),
  FileUploader = require('../../utils/uploadFile.utils'),
  utils = require('../../utils/utils'),
  allowedTags = [
    "Animaux", "Art", "Cuisine", "Divers", "Ecologie", "Entreprise", "Informatique", "Nature", "Plantes", "Politique", "Science", "Sport", "Ville"
  ];

exports.postsByUser = (req, res, next) => {
  if (
    !req.params.userId ||
    Object.keys(req.params).length !== 1
  ) {
    return res
      .status(400)
      .json(
        {
          message: "Votre requête ne contient pas le bon champ en paramètre"
        }
      )
  }

  if (isNaN(Number(req.params.userId))) {
    return res
      .status(400)
      .json(
        {
          message: "L'identifiant de l'utilisateur fourni dans la requête n'est pas du bon type"
        }
      )
  }

  next()
}

exports.postsByUserAndTag = (req, res, next) => {
  const fieldsArray = ["userId", "tag"]
  
  // Check the presence of the variables contained in the incomming request
  if (!utils.checkFieldsPresence(fieldsArray, req.body)) {
    return res 
      .status(400)
      .json(
        { 
          message: "Votre requête ne contient pas les bons champs" 
        }
      )
  } 

  if (typeof req.body.userId !== "number") {
    return res
      .status(400)
      .json(
        {
          message: "L'identifiant de l'utilisateur fourni dans la requête n'est pas du bon type"
        }
      )
  }

  if (
    req.body.tag !== null &&
    typeof req.body.tag !== "string" 
  ) {
    return res
      .status(400)
      .json(
        {
          message: "Le tag du post fourni dans la requête n'est pas du bon type"
        }
      )
  }

  if (
    typeof req.body.tag === "string" &&
    req.body.tag.length === 0 
  ) {
    return res
      .status(400)
      .json(
        {
          message: "Le tag du post fourni dans la requête doit avoir une longueur"
        }
      )
  }

  if (
    !allowedTags.includes(req.body.tag)
  ) {
    return res
      .status(400)
      .json(
        {
          message: "Le tag du post fourni n'est pas un tag valide"
        }
      )
  }

  next()
}

// Check the body request for post creation
exports.createPost = (req, res, next) => {
  console.log("req body form data create post =>", req.body)
  req.body = req.body?.infosPost ? JSON.parse(req.body.infosPost.toString()) : {} 

  // Check if the incoming request has the correct fields
  const fieldsArray = ["title", "youtube_id", "description", "link", "tag", "userId"]
  
  // Check the presence of the variables contained in the incomming request
  if (!utils.checkFieldsPresence(fieldsArray, req.body)) {
    return res 
      .status(400)
      .json(
        { 
          message: "Votre requête ne contient pas les bons champs" 
        }
      )
  } 

  // Check variables types
  if (
    typeof req.body.title !== "string" ||
    (req.body.youtube_id !== null && typeof req.body.youtube_id !== "string") ||
    typeof req.body.description !== "string" ||
    (req.body.link !== null && typeof req.body.link !== "string") ||
    (req.body.tag !== null && typeof req.body.tag !== "string") ||
    typeof req.body.userId !== "number" 
  ) {
    return res
      .status(400)
      .json(
        {
          message: "Certains champs ne sont pas du type attendu" 
        }
      )
  }

  // Check title and description length syntax
  if (!req.body.title.length) {
    return res
      .status(400)
      .json(
        {
          message: "Vous n'avez pas mentionné de titre" 
        }
      )
  }

  if (!req.body.description.length) {
    return res
      .status(400)
      .json(
        {
          message: "Vous n'avez pas mis de description à votre post" 
        }
      )
  }

  if (req.body.youtube_id) {
    if (!regexUtils.verifyYoutubeUrlSyntax(req.body.youtube_id)) {
      return res 
        .status(400)
        .json(
          {
            message: `${req.body.email} n'est pas une adresse mail valide`
          }
        ) 
    } else {
      // The verifyYoutubeUrlSyntax function returns the youtube id
      req.body.youtube_id = regexUtils.verifyYoutubeUrlSyntax(req.body.youtube_id)
    }
  }  

  if(
    req.body.link && 
    !regexUtils.verifyUrlSyntax(req.body.link)
    ) {
      return res 
        .status(400)
        .json(
          {
            message: `${req.body.link} n'est pas un lien externe valide`
          }
        ) 
    }

    if (!req.body.tag) req.body.tag = "Divers"

    if (!allowedTags.includes(req.body.tag)) {
      return res 
        .status(400)
        .json(
          {
            message: `'${req.body.tag}' n'est pas un tag valide`
          }
        ) 
    }
    
    console.log("REQ BODY after traitment =>", req.body)
    console.log("req token =>", req.decodedToken);
    
    next()
}

exports.editPost = (req, res, next) => {
  // Check if the incoming request has the correct fields
  const fieldsArray = ["title", "youtube_id", "description", "link", "tag", "user_id", "postId"]
  
  // Check the presence of the variables contained in the incomming request
  if (!utils.checkFieldsPresence(fieldsArray, req.body)) {
    return res 
      .status(400)
      .json(
        { 
          message: "Votre requête ne contient pas les bons champs" 
        }
      )
  } 

  // Check variables types
  if (
    typeof req.body.title !== "string" ||
    (req.body.youtube_id !== null && typeof req.body.youtube_id !== "string") ||
    typeof req.body.description !== "string" ||
    (req.body.link !== null && typeof req.body.link !== "string") ||
    (req.body.tag !== null && typeof req.body.tag !== "string") ||
    typeof req.body.userId !== "number" ||
    typeof req.body.postId !== "number"
  ) {
    return res
      .status(400)
      .json(
        {
          message: "Certains champs ne sont pas du type attendu" 
        }
      )
  }

  // Check title and description length syntax
  if (!req.body.title.length) {
    return res
      .status(400)
      .json(
        {
          message: "Vous n'avez pas mentionné de titre" 
        }
      )
  }

  if (!req.body.description.length) {
    return res
      .status(400)
      .json(
        {
          message: "Vous n'avez pas mis de description à votre post" 
        }
      )
  }

  if (req.body.youtube_id) {
    if (!regexUtils.verifyYoutubeUrlSyntax(req.body.youtube_id)) {
      return res 
        .status(400)
        .json(
          {
            message: `${req.body.youtube_id} n'est pas une adresse mail valide`
          }
        ) 
    } else {
      // The verifyYoutubeUrlSyntax function returns the youtube id
      req.body.youtube_id = regexUtils.verifyYoutubeUrlSyntax(req.body.youtube_id)
    }
  }  

  if(
    req.body.link && 
    !regexUtils.verifyUrlSyntax(req.body.link)
    ) {
      return res 
        .status(400)
        .json(
          {
            message: `${req.body.link} n'est pas un lien externe valide`
          }
        ) 
    }

    if (!req.body.tag) req.body.tag = "Divers"

    if (!allowedTags.includes(req.body.tag)) {
      return res 
        .status(400)
        .json(
          {
            message: `'${req.body.tag}' n'est pas un tag valide`
          }
        ) 
    }

    console.log("REQ BODY after traitment =>", req.body)
    next()
}

exports.deletePost = async (req, res, next) => {
  if (
    (req.decodedToken.id !== req.postInDB.userId) &&
    req.decodedToken.role !== "admin"
    ) {
    return res
      .status(403)
      .json(
        {
          message: "Vous n'avez pas les accréditations pour supprimer ce post"
        }
      )
  }

  console.log("req postInDB : ", req.postInDB)
  next()
}

exports.addImagesToPost = (req, res, next) => {
  console.log("post req in db =>", req?.postInDB)
  
  // Check the req.files isn't empty
  let imagesPost = req.files?.imagesPost ? req.files.imagesPost : null
  
  if (!imagesPost) {
    return res
      .status(400)
      .json(
        { 
          message: "Vous devez choisir des images à envoyer" 
        }
      )
  }
  console.log("posted imgs =>", imagesPost)
  req.postNewImages = imagesPost
  next()
}

// it must not exist more than 4 images for one post post, if just one is sent this is not an array, it's just an object and does not have length, so we consider 1 for jsut an object and not an objects array in case of many files
exports.checkImgsCountForPost = (req, res, next) => {
  let totalNumberOfImages;
  if (req.postNewImages.length > 1) {
    totalNumberOfImages = req.postNewImages.length + req.postImgsCount
  } else if (req.postNewImages) {
    totalNumberOfImages = 1 + req.postImgsCount
  }

  console.log("number of images in total =>", totalNumberOfImages)

  if (totalNumberOfImages > 4) {
    return res
      .status(500)
      .json(
        { 
          message: `Vous ne pouvez mettre que 4 images par post, actuellement il y en a ${req.postImgsCount} ` +  (req.postImgsCount > 1 ? "enregistrées" : "enregistrée") + ` et vous tentez d'en rajouter ${req.postNewImages?.length ? req.postNewImages.length : 1}` 
        }
      )
  } 

  next()
}

exports.deleteImagesPost = (req, res, next) => {
  // Check if the incoming request has the correct fields
  const fieldsArray = ["imageIds", "postId"]
  
  // Check the presence of the variables contained in the incomming request
  if (!utils.checkFieldsPresence(fieldsArray, req.body)) {
    return res 
      .status(400)
      .json(
        { 
          message: "Votre requête ne contient pas les bons champs" 
        }
      )
  } 

  // Check variables types
  if (
    !Array.isArray(req.body.imageIds) ||
    typeof req.body.postId !== "number"
  ) {
    return res
      .status(400)
      .json(
        {
          message: "Certains champs ne sont pas du type attendu" 
        }
      )
  }

  
  if (!req.body.imageIds.length) {
    return res
      .status(400)
      .json(
        { 
          message: "Votre requête ne contient pas d'identifiants d'images à supprimer" 
        }
      )
  }

  if (req.body.imageIds.length > 4) {
    return res
      .status(400)
      .json(
        { 
          message: `Vous ne pouvez supprimer que 4 images au maximum, votre requête en contient ${req.body.imageIds.length}` 
        }
      )
  }
  
  /*Check if a name is an empty string
  We use every function to stop loop when false is return, wich isn't possible with a forEach loop
  */
  let lengthError = false
  req.body.imageIds.every(imageId => {
    if (typeof imageId !== "number") {
      lengthError = true
      return false
    }
    return true
  })

  if (lengthError) {
    return res
        .status(400)
        .json(
          { 
            message: `Soit les identifiants des images ne sont pas présents dans la requête, soit ils ne sont pas du type attendu` 
          }
        )
  }

  next()
}