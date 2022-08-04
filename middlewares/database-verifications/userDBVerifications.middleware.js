// File to verify the content in the database for all incoming request for the user controller
// If something is wrong we return a code and a message to the controller which in this case will return an appropriate response and code status by describing the error

const userModel = require("../../models/user.model"),
  serverSecret = process.env.SERVER_SECRET,
  bcrypt = require('bcrypt'),
  jwt = require("jsonwebtoken");


exports.avoidDuplicateNames = async (req, res, next) => {
   // Check if name exist is database because it have to be unique
   const isNameAlreadyExist = await userModel.getUserByName(req.body.name)

   if (isNameAlreadyExist.code) {
    return res
      .status(500)
      .json(
        {
          message: "Un problème de connexion est survenu"
        }
      )
   } 

   if (isNameAlreadyExist.length) {
    return res
      .status(400)
      .json(
        {
          message: "Ce nom est déjà utilisé"
        }
      )
   }

   next()
}

exports.avoidDuplicateEmail = async (req, res, next) => {
  // Check if email exist is database because it have to be unique
  const isEmailAlreadyExist = await userModel.getUserByEmail(req.body.email)

  if (isEmailAlreadyExist.code) {
   return res
     .status(500)
     .json(
       {
         message: "Un problème de connexion est survenu"
       }
     )
  } 

  if (isEmailAlreadyExist.length) {
   return res
     .status(400)
     .json(
       {
         message: "Cet email est déjà utilisé"
       }
     )
  }

  next()
}

exports.retrieveUserById = async (req, res, next) => {
  // check if user exist in database
  // destructuration, affectation in a user variable
  let [user] = await userModel.getUserById(req.body.id)

  // Affect the user found in database to the incomming request to re-use it in the controller
  req.userInDB = {...user}

  if (req.userInDB.code) {
    return res
      .status(500)
      .json(
        {
          code: "connexion", 
          message: "Problème de connexion inattendu, la requête ne peut être satisfaite"
        }
      )
  } 

  if (!Object.keys(req.userInDB).length) {
      return res.
        status(400)
        .json(
          { 
            code: "id", 
            message: "Cet id n'est pas enregistré dans la base de données" 
          }
        )
  }

  next()
}

exports.verifyIfNewUserNameNotExistInDB = async (req, res, next) => {
  if (req.userInDB.name !== req.body.name) {
    const [isExist] = await userModel.getUserByName(req.body.name)
    console.log("verifyIfNewUserNameNotExistInDB :", isExist);
  
    if (isExist?.code) {
      return res
        .status(500)
        .json(
          {
            code: "connexion", 
            message: "Problème de connexion inattendu, la requête ne peut être satisfaite"
          }
        )
    } 
  
    if (isExist && Object?.keys(isExist)?.length) {
        return res.
          status(400)
          .json(
            { 
              code: "name", 
              message: "Ce nom est déjà enregistré dans la base de données" 
            }
          )
    }
  }

  next()
}

exports.verifyIfNewUserEmailNotExistInDB = async (req, res, next) => {
  if (req.userInDB.email !== req.body.email) {
    const [isExist] = await userModel.getUserByEmail(req.body.email)
    console.log("verifyIfNewUserEmailNotExistInDB:", isExist);
  
    if (isExist?.code) {
      return res
        .status(500)
        .json(
          {
            code: "connexion", 
            message: "Problème de connexion inattendu, la requête ne peut être satisfaite"
          }
        )
    } 
  
    if (isExist && Object?.keys(isExist)?.length) {
        return res.
          status(400)
          .json(
            { 
              code: "email", 
              message: "Cet email est déjà enregistré dans la base de données" 
            }
          )
    }
  }

  next()
}

exports.retrieveUserByEmail = async (req, res, next) => {
  // check if user exist in database
  // destructuration, affectation in a user variable
  let [user] = await userModel.getUserByEmail(req.body.email)
  console.log("user in db :", user);
  // Affect the user found in database to the incomming request to re-use it in the controller
  req.userInDB = {...user}

  if (req.userInDB.code) {
    return res
      .status(500)
      .json(
        {
          code: "connexion", 
          message: "Problème de connexion inattendu, la requête ne peut être satisfaite"
        }
      )
  } 

  if (!Object.keys(req.userInDB).length) {
      return res.
        status(400)
        .json(
          { 
            code: "email", 
            message: "Cet email n'est pas enregistré dans la base de données" 
          }
        )
  }

  next()
}

exports.retrieveUserByParamsName = async (req, res, next) => {
  // check if user exist in database
  // destructuration, affectation in a user variable
  const userName  = req.params.name
  let [userInDB] = await userModel.getUserByName(userName)
  console.log("user in db :", userInDB);

  if (!userInDB) {
    return res
      .status(400)
      .json(
        {
          code: "name", 
          message: "Cet utilisateur n'existe pas en base de données"
        }
      )
  }

  if (userInDB.code) {
    return res
      .status(500)
      .json(
        {
          code: "connexion", 
          message: "Problème de connexion inattendu, la requête ne peut être satisfaite"
        }
      )
  } 

  if (!Object.keys(userInDB).length) {
      return res.
        status(400)
        .json(
          { 
            code: "email", 
            message: "Ce nom n'est pas enregistré dans la base de données" 
          }
        )
  }

  req.userInDB = {...userInDB}

  next()
}


exports.comparePassword = async (req, res, next) => {
  await bcrypt.compare(req.body.password, req.userInDB.password)
    .then(async same => {
      if (!same) {
        return res
          .status(400)
          .json(
              { 
                  message: "Le mot de passe est incorrect"
              }
          )
      } else {
        delete req.userInDB.password
        delete req.userInDB.csrf_token
        // Transform dates to string in order to display it in the frontend
        req.userInDB.created_at = utils.formatDate(new Date(req.userInDB.created_at))
        req.userInDB.last_connection = utils.formatDate(new Date(Date.now()))

        const token = jwt.sign(req.userInDB, serverSecret, { expiresIn: "24h" })
        
        req.createdToken = token

        next()
      }
    })

}