// File to verify the content in the database for all incoming request for the post_likes controller
// If something is wrong we return a code and a message to the controller which in this case will return an appropriate response and code status by describing the error

const post_likesModel = require("../../models/post_likes.model"),
  user_friendsModel = require("../../models/user_friends.model"),
  postModel = require("../../models/post.model");

exports.getUsersWhoLikePost = async (req, res, next) => {
  let postInDb = await postModel.getPostById(req.body.postId)
  
  if (!postInDb.length) {
    return res
      .status(400)
      .json(
        {
          message: "Le post concerné n'est pas enregistré en base de données"
        }
      )
  }

  next()
}

exports.add = async (req, res, next) => {
  // ========================================
  let postInDb = await postModel.getPostById(req.body.postId)
  
  if (!postInDb.length) {
    return res
      .status(400)
      .json(
        {
          message: "Le post que vous tentez de liker n'est enregistré en base de données"
        }
      )
  }

  let areUsersFriend = await user_friendsModel.areWeFriend(req.body.userId, postInDb[0].user_id)

  if (!areUsersFriend.length) {
    return res
      .status(403)
      .json(
        {
          message: "Vous n'êtes pas autorisé à liker ce post"
        }
      )
  }

  // Check that the user has not already liked the post
  let likeInDB = await post_likesModel.getLikeByUserAndPostId(req.body.userId, req.body.postId)
  console.log("like in db =>", likeInDB)
  if (likeInDB.length) {
    return res
      .status(400)
      .json(
        {
          message: "Vous avez déjà liké ce post"
        }
      )
  }

  next()
}

exports.delete = async (req, res, next) => {
  let postInDb = await postModel.getPostById(req.body.postId)
  
  if (!postInDb.length) {
    return res
      .status(400)
      .json(
        {
          message: "Le post concerné n'est pas enregistré en base de données"
        }
      )
  }

  // Check if the like exist
  let likeInDB = await post_likesModel.getLikeByUserAndPostId(req.body.userId, req.body.postId)
  console.log("like in db =>", likeInDB)
  if (!likeInDB.length) {
    return res
      .status(400)
      .json(
        {
          message: "Le like que vous essayer de supprimer n'existe pas en base de données"
        }
      )
  }

  if (likeInDB[0].user_id !== req.body.userId) {
    return res
      .status(400)
      .json(
        {
          message: "Vous n'êtes pas autorisé à supprimer ce like"
        }
      )
  }

  next()
}