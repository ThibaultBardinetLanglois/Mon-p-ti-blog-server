const commentModel = require('../models/comment.model');


// I don't know if i really use this function
exports.getAllByPost = async (req, res) => {
  postId = req.params.postId
  await commentModel.getAllByPost(postId)
    .then(comments => {
      res.status(200).send(comments)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}

exports.getCommentById = async (req, res) => {
  await commentModel.read(req.params.commentId)
    .then(comment => res.status(200).send(comment))
    .catch(err => {
      res
        .status(500)
        .json(
          { 
            error: "Problème pour se connecter à la base de données" 
          }
        )
    } )
}

exports.create = async (req, res) => {
    await commentModel.create(
      req.body.comment, 
      req.body.userId, 
      req.body.postId
    )
      .then(response => {
        res
          .status(201)
          .json(
            { 
              message: "Vous avez ajouté un commentaire" 
            }
          )
      })
      .catch(err => {
        console.log("ERROR =>", err)
        res
          .status(500)
          .json(
            { 
              error: "Problème de connexion lors de la création du commentaire" 
            }
          )
      })
}

exports.updateComment = async (req, res) => {
  await commentModel.update(
    req.body.comment, 
    req.body.commentId
  )
    .then(response => {
      res
        .status(201)
        .json(
          { 
            message: "Commentaire mis à jour" 
          }
        )
    })
    .catch(err => {
      console.log("ERROR =>", err)
      res
        .status(500)
        .json(
          { 
            error: "Problème de connexion lors de la mise à jour" 
          }
        )
    })
}

exports.deleteComment = async (req, res) => {
  await commentModel.deleteComment(req.params.commentId)
    .then(response => {
      res
        .status(204)
        .json(
          { 
            message: "Le commentaire a bien été supprimé" 
          }
        )
    })
    .catch(err => {
      console.log("ERROR =>", err)
      res
        .status(500)
        .json(
          { 
            error: "Il y a un problème de connexion" 
          }
        )
    })
}