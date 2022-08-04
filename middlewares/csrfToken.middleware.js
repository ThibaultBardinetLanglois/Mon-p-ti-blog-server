const { log } = require('console');
const userModel = require('../models/user.model'),
  { randomBytes } = require('crypto');;

exports.getNewCsrfToken = async (req, res, next) => {
  const user = await userModel.getUserById(req.decodedToken.id)
  console.log('req decoded token in csrf mdw :', req.decodedToken)
  console.log('user found in db :', user);
  if (!user.length) {
    return res
      .status(403)
      .json(
        {
          message: "Vous n'êtes pas acrédité pour effectuer ce genre d'opérations"
        }
      )
  }

  const newCsrfToken = randomBytes(100).toString('base64')
  await userModel.setNewCsrfToken(newCsrfToken, user[0].id)
    .then(response => {
      console.log("Response update csrf token in database : ", response)
      req.csrfToken = newCsrfToken
      next()
    })
    .catch(err => {
      res
        .status(500)
        .json(
          {
            message: "Problème de connexion interne à la base de données"
          }
        )
    })
}

exports.verifyCsrfToken = async (req, res, next) => {
  if (!req.headers['xsrf-token']) {
    return res
    .status(403)
    .json(
      { 
        message: `Vous n'avez pas les accréditations pour effectuer cette action` 
      }
      )
    }
    
    if (req.headers['xsrf-token'] !== req.decodedToken.csrf_token) {
      return res
      .status(403)
      .json(
        { 
          message: `Vous n'avez pas les accréditations pour effectuer cette action` 
        }
        )
      }
      
  next()
}

exports.deleteCsrfTokenInResponse = (req, res, next) => {
  delete req.decodedToken.csrf_token

  next()
}