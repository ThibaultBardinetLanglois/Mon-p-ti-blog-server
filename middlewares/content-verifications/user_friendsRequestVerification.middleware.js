// File to verify the content for all incoming request for the user_friends controller
// Check the presence of the expected variables and their type
// Check their syntax with the regex.utils file if it is required
// If something is wrong we return a code and a message to the controller which in this case will return an appropriate response and code status by describing the error

const utils = require("../../utils/utils");

// Middleware which verify that the request body just contains one userId property
exports.checkUserIdInRequestBody = (req, res, next) => {
  console.log("req body for checking :", req.body)
  if (
    Object.keys(req.body).length !== 1 ||
    !req.body.userId
  ) {
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

exports.checkUserIdInRequestParams = (req, res, next) => {
  console.log("req params for checking :", req.params)
  if (
    Object.keys(req.params).length !== 1 ||
    !req.params.userId
  ) {
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
    isNaN(Number(req.params.userId))
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

exports.proposeToBeFriend = (req, res, next) => {
  const fieldsArray = ["userId", "friendId"]

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
    typeof req.body.userId !== "number" ||
    typeof req.body.friendId !== "number" 
  ) {
    return res
      .status(400)
      .json(
        {
          message: "Certains champs ne sont pas du type attendu" 
        }
      )
  }

  if (req.body.userId === req.body.friendId) {
    return res
      .status(400)
      .json(
        {
          message: "Vous ne pouvez pas être votre propre ami" 
        }
      )
  }
  
  next()
}

exports.checkRelationIdInRequest = (req, res, next) => {
  if (
    Object.keys(req.body).length !== 1 ||
    !req.body.relationId
  ) {
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
    typeof req.body.relationId !== "number" 
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

exports.areWeFriend = (req, res, next) => {
  if (
    Object.keys(req.body).length !== 2 ||
    !req.body.userId ||
    !req.body.potentialFriendId
  ) {
    return res 
      .status(400)
      .json(
        { 
          message: "Votre requête ne contient pas les bons champs" 
        }
      )
  } 

  // Check variables types
  if (typeof req.body.userId !== "number") {
    return res
      .status(400)
      .json(
        {
          message: "Certains champs ne sont pas du type attendu" 
        }
      )
  }

  if (typeof req.body.potentialFriendId !== "number") {
    return res
      .status(400)
      .json(
        {
          message: "Certains champs ne sont pas du type attendu" 
        }
      )
  }

  if (req.body.userId === req.body.potentialFriendId) {
    return res
      .status(400)
      .json(
        {
          message: "Vous ne pouvez pas être votre propre ami" 
        }
      )
  }

  next()
}



