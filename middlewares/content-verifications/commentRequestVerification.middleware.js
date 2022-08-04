// File to verify the content for all incoming request for the comment controller
// Check the presence of the expected variables and their type
// Check their syntax with the regex.utils file if it is required
// If something is wrong we return a code and a message to the controller which in this case will return an appropriate response and code status by describing the error

const utils = require("../../utils/utils");

exports.getAllByPost = async (req, res, next) => {
  console.log("req params =>", req.params)
  if (
    Object.keys(req.params).length !== 1 ||
    !req.params.postId ||
    isNaN(Number(req.params.postId))
    ) {
    return res
        .status(400)
        .json(
          {
            message: "Vous devez envoyer le bon paramètre dans la requête"
          }
        )
  }

  next()
}

exports.getById = async (req, res, next) => {
  const commentId = req.params?.commentId

  if (!commentId) {
    return res
      .status(406)
      .json(
        { 
          error: "Le commentaire fourni en paramètres est inconnu" 
        }
      )
  }

  if (isNaN(Number(commentId))) {
    return res
      .status(406)
      .json(
        { 
          error: "Le commentaire fourni en paramètres est inconnu" 
        }
      )
  }

  next()
}

exports.create = async (req, res, next) => {
  // Check if the incoming request has the correct fields
  const fieldsArray = ["comment", "userId", "postId"]
  
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
    typeof req.body.comment !== "string" ||
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
  if (!req.body.comment.length) {
    return res
      .status(400)
      .json(
        {
          message: "Vous n'avez pas rédigé de commentaire" 
        }
      )
  }

  next()
}

exports.edit = async (req, res, next) => {
  // Check if the incoming request has the correct fields
  const fieldsArray = ["comment", "commentId"]
  
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
    typeof req.body.comment !== "string" ||
    typeof req.body.commentId !== "number" 
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
  if (!req.body.comment.length) {
    return res
      .status(400)
      .json(
        {
          message: "Vous n'avez pas rédigé de commentaire" 
        }
      )
  }

  next()
}

exports.delete = async (req, res, next) => {
  if (
    !req.params.commentId ||
    isNaN(Number(req.params.commentId))
    ) {
      return res
      .status(400)
      .json(
        {
          message: "L'identifiant du commentaire n'est pas fourni en paramètre de la requête ou il n'est pas du bon type" 
        }
      )
  }
  
  next()
}