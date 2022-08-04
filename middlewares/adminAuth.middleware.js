const userModel = require('../models/user.model');

exports.verifyAdminRole = async (req, res, next) => {
  if (!req.decodedToken) {
    return res
      .status(403)
      .json(
        {
          code:"token",  
          message: "Vous n'avez pas de jeton d'authentification"
        }
      )
  } 

  // Check in database if the user id is well registered
  userFoundInDB = await userModel.getUserById(req.decodedToken.id)
  
  if (!userFoundInDB.length) {
      return res
          .status(403)
          .json(
              {
                  message: "Vous n'êtes plus enregistré en base de données, vous devriez vous inscrire de nouveau"
              }
          )
  }

  if (req.decodedToken.role !== "admin") {
    return res
      .status(403)
      .json(
        { 
          message: "Vous devez avoir un rôle d'administrateur pour effectuer ce type d'opération" 
        }
      )
  } 
  next()
}
