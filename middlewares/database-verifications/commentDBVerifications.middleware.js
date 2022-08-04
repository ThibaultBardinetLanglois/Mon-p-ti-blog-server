// File to verify the content in the database for all incoming request for the comment controller
// If something is wrong we return a code and a message to the controller which in this case will return an appropriate response and code status by describing the error

const commentModel = require("../../models/comment.model"),
  postModel = require("../../models/post.model"),
  user_friendsModel = require("../../models/user_friends.model");


exports.getAllByPost = async (req, res, next) => {
  let post = await postModel.getPostById(req.params.postId)
  console.log("post in db =>", post);
  if (!post.length) {
    return res
      .status(400)
      .json(
        {
          message: "Le post indiqué n'est pas enregistré dans la base de données"
        }
      )
  }

  next()
}

exports.getById = async (req, res, next) => {
  const commentInDB = await commentModel.getById(req.params.commentId)

  if (!commentInDB.length) {
    return res
      .status(400)
      .json(
        {
          message: "Le commentaire indiqué n'est pas enregistré dans la base de données"
        }
      )
  }

  const postInDB = await postModel.getPostById(commentInDB[0].post_id)
  if (!postInDB.length) {
    return res
      .status(403)
      .json(
        {
          message: "Le post auquel est associé ce commentaire n'existe pas"
        }
      )
  }

  const isPosterFriend = await user_friendsModel.areWeFriend(req.decodedToken.id, postInDB[0].user_id)
  console.log("is friend =>", isPosterFriend);
  if (!isPosterFriend.length) {
    return res
      .status(403)
      .json(
        {
          message: "Vous n'êtes pas ami avec la personne qui a créée le post auquel est lié le commentaire"
        }
      )
  }

  next()
}

// Check if the post attached to the comment exist in database
exports.create = async (req, res, next) => {
  let postInDB = await postModel.getPostById(req.body.postId)

  if (!postInDB.length) {
    return res
      .status(400)
      .json(
        {
          message: "Le post indiqué n'est pas enregistré dans la base de données"
        }
      )
  }

  // Check if the user who want to comment the post is friend with the user who posted
  let areUsersFriends = await user_friendsModel.areWeFriend(req.decodedToken.id, postInDB[0].user_id)

  if (!areUsersFriends.length) {
    return res
      .status(403)
      .json(
        {
          message: "Vous n'êtes pas autorisé à commenter ce post"
        }
      )
  }

  next()
}

exports.edit = async (req, res, next) => {
  const commentInDB = await commentModel.getById(req.body.commentId)
  console.log("comment in db =>", commentInDB);

  if (!commentInDB.length) {
    return res
      .status(400)
      .json(
        {
          message: "Le commentaire indiqué n'est pas enregistré dans la base de données"
        }
      )
  }

  if (commentInDB[0].user_id !== req.decodedToken.id) {
    return res
      .status(403)
      .json(
        {
          message: "Vous n'avez pas les accréditations pour modifier ce commentaire"
        }
      )
  }
  
  next()
}

exports.delete = async (req, res, next) => {
  let commentInDB = await commentModel.getById(req.params.commentId)
  
  if (!commentInDB.length) {
    return res
      .status(400)
      .json(
        {
          message: "Le commentaire indiqué n'est pas enregistré dans la base de données"
        }
      )
  }

  if (commentInDB[0].user_id !== req.decodedToken.id) {
    return res
      .status(403)
      .json(
        {
          message: "Vous n'avez pas les accréditations pour supprimer ce commentaire"
        }
      )
  }

  next()
}