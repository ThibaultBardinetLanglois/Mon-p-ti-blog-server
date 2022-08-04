// File to verify the content for all incoming request for the post_likes controller
// Check the presence of the expected variables and their type
// Check their syntax with the regex.utils file if it is required
// If something is wrong we return a code and a message to the controller which in this case will return an appropriate response and code status by describing the error

const utils = require("../../utils/utils");


exports.getUsersWhoLikePost = (req, res, next) => {
  if (
    !req.body.postId || 
    Object.keys(req.body).length !== 1
    ){
      return res 
      .status(400)
      .json(
        { 
          message: "Votre requête ne contient pas le bon champ" 
        }
      )
    }

  if (typeof req.body.postId !== "number") {
    return res 
      .status(400)
      .json(
        { 
          message: "L'identifiant du post n'est pas du bon type" 
        }
      )
  }

  next()
}

exports.checkFieldsPresence = (req, res, next) => {
  // Check if the incoming request has the correct fields
  const fieldsArray = ["postId", "userId"]
  
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
    typeof req.body.postId !== "number" ||
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

  next()
}
