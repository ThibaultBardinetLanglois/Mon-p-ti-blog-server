const post_likesModel = require('../models/post_likes.model');

exports.getUsersWhoLikePost = async (req, res) => {
  await post_likesModel.getUsersWhoLikePost(req.body.postId)
    .then(users => {
      res
        .status(200)
        .json(
          { 
            likes_count: users.length, users: users 
          }
        )
    })
    .catch(err => console.log(err))
}

exports.addLike = async (req, res) => {
  await post_likesModel.addLike(
    req.body.postId, 
    req.body.userId
    )
    .then(response => {
      res
        .status(201)
        .json(
          { 
            message: "Vous venez de liker ce post" 
          }
        )
    })
    .catch(err => {
      console.log("ERROR => ", err)
      res
        .status(500)
        .json(
          { 
            error: "Problème de connexion" 
          }
        )
    })
}

exports.deleteLike = async (req, res) => {
  await post_likesModel.deleteLike(
    req.body.postId, 
    req.body.userId
  )
    .then(response => {
      res
        .status(204)
        .json(
          { 
            message: "Vous venez retirer votre like de ce post" 
          }
        )
    })
    .catch(err => {
      console.log("ERROR => ", err)
      res
        .status(500)
        .json(
          { 
            error: "Problème de connexion" 
          }
        )
    })
}