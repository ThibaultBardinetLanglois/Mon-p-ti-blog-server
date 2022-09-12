// File to verify the content in the database for all incoming request for the user_friends controller
// If something is wrong we return a code and a message to the controller which in this case will return an appropriate response and code status by describing the error

const user_friendsModel = require("../../models/user_friends.model"),
  userModel = require("../../models/user.model");


exports.getRelationIfItExists = async (req, res, next) => {
  let user = await userModel.getUserById(req.params.userId)
  if (user.code) {
    return res
      .status(500)
      .json(
        {
          message: "Erreur de connection interne à la base de données"
        }
      )
  }

  if (!user.length) {
    return res
      .status(400)
      .json(
        {
          message: "Un des utilisateur n'existe pas en base de données"
        }
      )
  }

  let potentialFriend = await userModel.getUserById(req.params.potentialFriendId)
  if (potentialFriend.code) {
    return res
      .status(500)
      .json(
        {
          message: "Erreur de connection interne à la base de données"
        }
      )
  }

  if (!potentialFriend.length) {
    return res
      .status(400)
      .json(
        {
          message: "Un des utilisateur n'existe pas en base de données"
        }
      )
  }

  next()
}

exports.checkIfUserIdInParamsExists = async (req, res , next) => {
  let user = await userModel.getUserById(req.params.userId)
  if (user.code) {
    return res
      .status(500)
      .json(
        {
          message: "Erreur de connection interne à la base de données"
        }
      )
  }

  if (!user.length) {
    return res
      .status(400)
      .json(
        {
          message: "L'utilisateur passé en paramètre de la requête n'existe pas en base de données"
        }
      )
  }

  next()
}

exports.proposeToBeFriend = async (req, res, next) => {
  // Check if friend exist in database
  let friendInDB = await userModel.getUserById(req.body.friendId)
  console.log("Friend found in db : ", friendInDB)

  if (!friendInDB.length) {
    return res
      .status(400)
      .json(
        {
          message: "L'utilisateur auquel vous envoyé une invitation n'existe pas en base de données"
        }
      )
  }

  if (friendInDB.code) {
    return res
      .status(400)
      .json(
        {
          message: "Erreur de connexion interne à la base de données"
        }
      )
  }

  // Attach the potential friend name to the request in order to reuse it in the controller
  req.friendName = friendInDB[0].name

  // Check if an invitation has already been sent and is still in a pending state is to avoid duplicate
  let isPendingRelationAlreadyExist = await user_friendsModel.isTherePendingRelation(req.body.userId, req.body.friendId)

  if (isPendingRelationAlreadyExist.code) {
    return res
      .status(500)
      .json(
        { 
          message: "Erreur de connexion interne" 
        }
      )
  } 

  if (isPendingRelationAlreadyExist.length) {
    return res
      .status(400)
      .json(
        { 
          message: "L'invitation a déjà été envoyée" 
        }
      )
  } 

  // Check if an invitation has already been sent and is in a status active is to avoid duplicate
  let isActiveRelationAlreadyExist = await user_friendsModel.areWeFriend(req.body.userId, req.body.friendId)
  if (isActiveRelationAlreadyExist.code) {
    return res
      .status(500)
      .json(
        { 
          message: "Erreur de connexion interne" 
        }
      )
  } 
    if (isActiveRelationAlreadyExist.length) {
      return res
        .status(400)
        .json(
          { 
            message: `Vous êtes déjà ami avec ${friend[0].name}` 
          }
        )
    } 

  next()
}

exports.validateTobeFriend = async (req, res, next) => {
  // When we accept the invitation we are aware that we are the receiver in database so our id is the user_friend_id
  // Check if friend relation exist in database
  let relationInDB = await user_friendsModel.getRelationById(req.body.relationId)

  if (relationInDB.code) {
    return res
      .status(500)
      .json(
        { 
          message: "Erreur de connexion interne" 
        }
      )
  } 

  if (!relationInDB.length) {
    return res
      .status(400)
      .json(
        { 
          message: "Cette invitation n'existe pas en base de données" 
        }
      )
  }

  let newFriendInDB = await userModel.getUserById(relationInDB[0].user_id)

  if (!newFriendInDB.length) {
    return res
      .status(400)
      .json(
        { 
          message: "L'utilisateur qui vous a envoyé l'invitation n'existe pas en base de données, vous devriez supprimer l'invitation et ne pas l'accepter" 
        }
      )
  }

  // Check if we are the receiver
  if (
    relationInDB[0].user_id === req.decodedToken.id ||
    relationInDB[0].friend_user_id !== req.decodedToken.id 
    ) {
    return res
      .status(400)
      .json(
        { 
          message: "Cette invitation est corrompue et ne vous concerne pas, vous devriez la supprimer et ne pas l'accepter" 
        }
      )
  }

  // Check if the relation isn't already active
  if (relationInDB[0].status !== "pending") {
    return res
      .status(400)
      .json(
        { 
          message: `Vous êtes déjà ami avec ${newFriendInDB[0].name}. Cette relation est déjà active, vous devriez supprimer l'invitation et ne pas l'accepter.` 
        }
      )
  }

  console.log("new friend found in db =>", newFriendInDB)
  
  req.newFriendName = newFriendInDB[0].name
  req.newFriendImage = newFriendInDB[0].image

  next()
}

exports.deleteFriend = async (req, res, next) => {
  let relationInDB = await user_friendsModel.getRelationById(req.body.relationId)
  
  if (relationInDB.code) {
    return res
      .status(500)
      .json(
        { 
          message: "Problème de connexion interne à la base de données" 
        }
        )
  } 

  if (!relationInDB.length) {
    return res
      .status(400)
      .json(
        { 
          message: "Cet invitation n'existe pas en base de données" 
        }
      )
  } 
  if (
    relationInDB[0].status !== "pending" &&
    relationInDB[0].status !== "active"
    ) {
    return res
      .status(400)
      .json(
        { 
          message: "Cette invitation n'est pas valide, elle n'est ni active ni en attente, vous devriez la supprimer et ne pas l'accepter" 
        }
      )
  } 

  console.log("RELATION FOUND =>", relationInDB)

   // Check if we are the sender or the receiver
   if (
    relationInDB[0].user_id !== req.decodedToken.id &&
    relationInDB[0].friend_user_id !== req.decodedToken.id 
    ) {
    return res
      .status(403)
      .json(
        { 
          message: "Cette invitation ne vous inclut pas, vous n'êtes donc pas autorisé à la supprimer" 
        }
      )
  }

  next()
}

exports.areWeFriend = async (req, res ,next) => {
  let potentialFriend = await userModel.getUserById(req.body.potentialFriendId)

  if (potentialFriend.code) {
    return res
      .status(400)
      .json(
        { 
          message: "Ce potentiel ami n'existe pas en tant qu'utilisateur das la base de données" 
        }
      )
  } 
  
  if (!potentialFriend.length) {
    return res
      .status(400)
      .json(
        { 
          message: "Ce potentiel ami n'existe pas en tant qu'utilisateur das la base de données" 
        }
      )
  }

  req.potentialFriendName = potentialFriend[0].name
  req.potentialFriendImage = potentialFriend[0].image
  
  next()
}