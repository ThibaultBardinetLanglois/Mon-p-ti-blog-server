const jwt = require('jsonwebtoken'),
    secret = process.env.SERVER_SECRET,
    userModel = require('../models/user.model');

exports.verifyToken = (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        if (token) {
            jwt.verify(token, secret, async (err, decodedToken) => {
            if (err) {
                console.log("Error when attempting to verify token authenticity =>", err)
                return res
                    .status(403)
                    .json(
                        { 
                            message: "Peut être que votre session a expirée, en tout cas le token contenu dans votre requête est invalide, vous devez vous connecter"
                        }
                    )
            } else {
                // Check if token has expired
                const currentTime = new Date().getTime() / 1000
                console.log('CURRENT TIME =>', currentTime)

                if (currentTime > decodedToken.exp) {
                    res
                        .status(403)
                        .json(
                            {
                                message: 'Le token a expiré'
                            }
                        )
                }

                // Check in database if the user id is well registered
                const userInDB = await userModel.getUserById(decodedToken.id)

                if(!userInDB.length) {
                    return res
                        .status(403)
                        .json(
                            { 
                                message: "Votre token contient des informations incorrectes, il est possible que vous ne soyez plus enregistré en base de données, vous devriez vous inscrire de nouveau" 
                            }
                        )
                } 
                console.log(`User '${decodedToken.name}' well identified, user data =>`, decodedToken)
                delete userInDB[0].password
                req.decodedToken = userInDB[0]
                console.log("req decoded token =>", req.decodedToken)

                next()
            }
            })
        } else {
            return res
                .status(403)
                .json(
                    { 
                        message: "Vous devez être connecté pour accéder à certains contenus. Actuellement la requête nécéssite un jeton d'authentification"
                    }
                )
        }
    } catch (err) {
        res.status(401).json({ message: error.message, code: 401 })
    }
}


// Check user authenticity, verify if userId in the body request is the same as in the token
exports.checkUserIdInBodyRequest = (req, res, next) => {
  if (req.body.userId !== req.decodedToken.id) {
    return res
      .status(403)
      .json(
        {
          message: "L'identifiant utilisateur fourni dans le corps de la requête n'est pas celui contenu dans votre jeton d'authentification"
        }
      )
  }

  next()
}

// Check user authenticity, verify if userId in the params request is the same as in the token
exports.checkUserIdInParamsRequest = (req, res, next) => {
    if (Number(req.params.userId) !== req.decodedToken.id) {
      return res
        .status(403)
        .json(
          {
            message: "L'identifiant utilisateur fourni dans les paramètres de la requête n'est pas celui contenu dans votre jeton d'authentification"
          }
        )
    }
  
    next()
  }

