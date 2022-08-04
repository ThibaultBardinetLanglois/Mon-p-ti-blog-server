// File to verify the content for all incoming request for the user controller
// Check the presence of the expected variables and their type
// Check their syntax with the regex.utils file if it is required
// If something is wrong we return a code and a message to the controller which in this case will return an appropriate response and code status by describing the error

const regexUtils = require('../../utils/regex.utils'),
  FileUploader = require('../../utils/uploadFile.utils'),
  utils = require('../../utils/utils');


// Authentication
//===============

exports.userRegister = (req, res, next) => {
  console.log("REQ BODY =>", req.body)

  // Check if the incoming request has the correct fields
  const fieldsArray = ["name", "email", "password"]
  
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
    typeof req.body.name !== "string" ||
    typeof req.body.email !== "string" || 
    typeof req.body.password !== "string" 
  ) {
    return res
      .status(400)
      .json(
        {
          message: "Le nom, l'email ainsi que le mot de passe doivent être des chaînes de caractères" 
        }
      )
  }

  // Check name, email and password syntax
  if (!req.body.name.length) {
    return res
      .status(400)
      .json(
        {
          message: "Vous n'avez pas mentionné votre nom" 
        }
      )
  }

  if (!regexUtils.verifyEmailSyntax(req.body.email)) {
    return res 
      .status(400)
      .json(
        {
          message: `${req.body.email} n'est pas une adresse mail valide`
        }
      ) 
  }

  if (!regexUtils.verifyPasswordSyntax(req.body.password)) {
    return res
      .status(400)
      .json(
        {
          message: `${req.body.password} n'est pas un mot de passe valide, il faut que ce dernier soit d'une longueur d'au moins 8 caractères avec au moins 1 lettre minuscule, 1 lettre majuscule, un chiffre et un caractère spécial`
        }
      )
  }

  // Remove accents in name
  req.body.name = utils.removeAccentsInString(req.body.name)

  // All is correct we can go on by next
  next()
}

exports.userLogin = (req, res, next) => {
  console.log("REQ BODY =>", req.body)

  // Check if the incoming request has the correct fields
  const fieldsArray = ["email", "password"]
  
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
    typeof req.body.email !== "string" || 
    typeof req.body.password !== "string" 
  ) {
    return res
      .status(400)
      .json(
        {
          message: "L'email ainsi que le mot de passe doivent être des chaînes de caractères" 
        }
      )
  }

  // Check name, email and password syntax

  if (!regexUtils.verifyEmailSyntax(req.body.email)) {
    return res 
      .status(400)
      .json(
        {
          message: `${req.body.email} n'est pas une adresse mail valide`
        }
      ) 
  }

  if (!regexUtils.verifyPasswordSyntax(req.body.password)) {
    return res
      .status(400)
      .json(
        {
          message: `${req.body.password} n'est pas un mot de passe valide, il faut que ce dernier soit d'une longueur d'au moins 8 caractères avec au moins 1 lettre minuscule, 1 lettre majuscule, un chiffre et un caractère spécial`
        }
      )
  }

  next()
}

// First verify if the id in the request token is the same as the req.body.userInfos
// Second, retrieve file image if it exists and edited post, and stock it into the request to retrieve it later
exports.checkEditUserRequest = (req, res, next) => {
  console.log("user edit req body : ", req.body);
  console.log("user edit req files : ", req.files);
  console.log("userInfos formatted : ", JSON.parse(req.files.userInfos.data.toString()));
  if (JSON.parse(req.files.userInfos.data.toString()).id !== req.decodedToken.id) {
    return res
    .status(403)
    .json(
      {
        message: "Vous n'êtes pas autorisé à modifier ce profil"
      }
      )
  }
    
  // We authorize just one pic per user
  if (req?.files?.imgProfile?.length > 1) {
    return res
    .status(500)
    .json(
      { 
        err: "Vous ne devez sélectionner qu'une seule image" 
      }
      )
  } 
      
  // we have to target the buffer for retrieve data
  let imgProfile = req?.files?.imgProfile ? req.files.imgProfile : null,
    newFileName = null;
  req.body = JSON.parse(req.files.userInfos.data.toString())
  
  if (imgProfile && imgProfile.size > 200000) {
    return res
      .status(400)
      .json(
        {
          message: "La taille de l'image ne doit pas excéder 200 ko"
        }
      )
  }
  console.log("Edited infos =>", req.body)
  
  // Verify userInfos content,if all variables are presents and their types
  // Check if the incoming request has the correct fields
  const fieldsArray = ["id", "name", "email","description", "passions"]
      
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
  typeof req.body.id !== "number" ||
  typeof req.body.name !== "string" ||
  typeof req.body.email !== "string" || 
  (req.body.description !== null && typeof req.body.description !== "string") ||
  (req.body.passions !== null && typeof req.body.passions !== "string") 
  ) {
    return res
      .status(400)
      .json(
        {
          message: "Certains des champs attendus ne sont pas du bon type" 
        }
      )
  }
 
  // Check name and email syntax
  if (!req.body.name.length) {
    return res
      .status(400)
      .json(
        {
          message: "Vous n'avez pas mentionné votre nom" 
        }
      )
  }

  // Remove accents in name
  req.body.name = utils.removeAccentsInString(req.body.name)
 
  if (!regexUtils.verifyEmailSyntax(req.body.email)) {
    return res 
      .status(400)
      .json(
        {
          message: `${req.body.email} n'est pas une adresse mail valide`
        }
      ) 
  }

  // if img profile is sent (not null) we use the service to register it and return its formated name
  if (imgProfile) {
      if (imgProfile.size > 200000) {
          return res
            .status(500)
            .json(
              { 
                message: "La taille du fichier de doit pas excéder 200 octets" 
              }
            )
      }
      newFileName = FileUploader.uploadFile(imgProfile, {username: req.body.name, flag: 'profile_image'})
  } else {
      console.log('No img file in the request')
      newFileName = null
  }

  req.filename = newFileName
  req.imgProfile = imgProfile

  next()
}

exports.checkUserIdInParams = (req, res, next) => {
  if (!req.params.userId) {
    return res
      .status(400)
      .json(
        {
          message: "Votre requête ne contient pas le bon paramètre"
        }
      )
  }

  if (isNaN(Number(req.params.userId))) {
    return res
      .status(400)
      .json(
        {
          message: "Le type de l'identifiant en paramètre de votre requête n'est pas correct"
        }
      )
  }

  next()
}

exports.checkUserNameInParams = (req, res, next) => {
  if (!req.params.name) {
    return res
      .status(400)
      .json(
        {
          message: "Votre requête ne contient pas le bon paramètre"
        }
      )
  }

  if (
    typeof req.params.name !== "string" ||
    !req.params?.name.length
    ) {
    return res
      .status(400)
      .json(
        {
          message: "Le nom fourni en paramètre de votre requête n'est pas correct"
        }
      )
  }

  next()
}