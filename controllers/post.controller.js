const FileUploader = require("../utils/uploadFile.utils"),
  postModel = require("../models/post.model"),
  post_imgsModel = require("../models/post_images.model"),
  post_likesModel = require("../models/post_likes.model"),
  commentsModel = require('../models/comment.model'),
  userModel = require('../models/user.model'),
  regexUtils = require('../utils/regex.utils'),
  utils = require('../utils/utils');
  
// For display the last posts when user isn't connected
exports.getLastPostsForNoLogged = async (req, res) => {
  // Put last comments in an array
  let posts = await postModel.getLastPosts()
  console.log("POSTS =>", posts)

  if (posts.code) {
    return res
      .status(500)
      .json(
        { 
          message: "Erreur de connexion interne" 
        }
      )
  } 
  
  // Get likes per post
  posts = await Promise.all(posts.map(async post => {
    let likesCount = await post_likesModel.getLikesCountForPost(post.id)
    if (likesCount.code) {
      return res
        .status(500)
        .json(
          { 
            message: "Erreur de connexion interne" 
          }
        )
    } 
    likesCount = likesCount[0]['COUNT(*)']

    // Don't forget to format the dates before sending the post
    post.created_at = utils.formatDate(post.created_at)
    if(post.updated_at) post.updated_at = utils.formatDate(post.updated_at)

    return {...post, likesCount : likesCount}
  }))

  // Get all comments per post
  posts = await Promise.all(posts.map(async post => {
    // Put all comments in array
    let comments = await commentsModel.getAllByPost(post.id)
    if (comments.code) {
      return res
        .status(500)
        .json(
          { 
            message: "Erreur de connexion interne" 
          }
        )
    } 

    // Get user which create the comment
    await Promise.all(comments.map(async comment => {
      let sender = await userModel.getUserById(comment.user_id)
      if (sender.code) {
        return res
          .status(500)
          .json(
            { 
              message: "Erreur de connexion interne" 
            }
          )
      } 
      delete sender[0].password
      delete sender[0].email
      delete sender[0].role
      delete sender[0].description
      delete sender[0].passions
      delete sender[0].created_at
      delete sender[0].last_connection
      // Attach sender to the comment
      comment.senderInfos = sender
    }))

    return {...post, comments : comments}
  }))

  // Get all pics for each post
  posts = await Promise.all(posts.map(async post => {
    let images = await post_imgsModel.getImagesByPost(post.id)
    if (images.code) {
      return res
        .status(500)
        .json(
          { 
            message: "Erreur de connexion interne" 
          }
        )
    } 
    return {...post, images : images}
  }))

  console.log("POSTS =>", posts)
  res.status(200).send(posts)
}

// For display the last posts when user is connected and is on his page profile
exports.getPostsByUser = async (req, res) => {
  let posts = await postModel.getAllByUser(req.params.userId)
  if (posts.code) {
    return res
      .status(500)
      .json(
        { 
          message: "Erreur de connexion interne"  
        }
      )
  } 
  
  if (posts.length > 0) {
    posts = await Promise.all(posts.map(async post => {
      let likesSenders = await post_likesModel.getUsersWhoLikePost(post.id)
      if (likesSenders.code) {
        return res
          .status(500)
          .json(
            { 
              message: "Erreur de connexion interne"  
            }
          )
      }
      
      post.created_at = utils.formatDate(post?.created_at)
      if (post.updated_at) post.updated_at = utils.formatDate(post?.updated_at)
      return {...post, likes: likesSenders}
    }))

    posts = await Promise.all(posts.map(async post => {
      let comments = await commentsModel.getAllByPost(post.id)
      if (comments.code) {
        return res
        .status(500)
        .json(
          { 
            message: "Erreur de connexion interne" 
          }
        )
      } 
  
      await Promise.all(comments.map(async comment => {
        comment.created_at = utils.formatDate(comment?.created_at)
        if (comment.updated_at) comment.updated_at = utils.formatDate(comment?.updated_at)

        let sender = await userModel.getUserById(comment.user_id)
        if (sender.code) {
          return res
            .status(500)
            .json(
              { 
                message: "Erreur de connexion interne" 
              }
            )
        } 
        sender = {
          id: sender[0].id,
          name: sender[0].name,
          profileImg: sender[0].image
        }
        comment.senderInfos = sender
      }))
  
      return {...post, comments : comments}
    }))

    posts = await Promise.all(posts.map(async post => {
      let images = await post_imgsModel.getImagesByPost(post.id)
      if (images.code) {
        return res
          .status(500)
          .json(
            { 
              message: "Erreur de connexion interne"  
            }
          )
      } 
      return {...post, images : images}
    }))
  
    return res.status(200).send(posts)
  } else {
    return res
      .status(200)
      .json(
        { 
          message: `Il n'y a pas encore de posts enregistrés` 
        }
      )
  }
}

exports.getPostsByUserAndTag = async (req, res) => {
  let posts = await postModel.getAllByUserAndTag(req.body.userId, req.body.tag)
  if (posts.code) {
    return res
      .status(500)
      .json(
        { 
          message: "Erreur de connexion interne"  
        }
      )
  } 
  
  if (posts.length > 0) {
    posts = await Promise.all(posts.map(async post => {
      let [likesCount] = await post_likesModel.getLikesCountForPost(post.id)
      if (likesCount.code) {
        return res
          .status(500)
          .json(
            { 
              message: "Erreur de connexion interne"  
            }
          )
      }
      
      return {...post, likesCount: likesCount["COUNT(*)"]}
    }))

    posts = await Promise.all(posts.map(async post => {
      let comments = await commentsModel.getAllByPost(post.id)
      if (comments.code) {
        return res
        .status(500)
        .json(
          { 
            message: "Erreur de connexion interne" 
          }
        )
      } 
  
      await Promise.all(comments.map(async comment => {
        let sender = await userModel.getUserById(comment.user_id)
        if (sender.code) {
          return res
            .status(500)
            .json(
              { 
                message: "Erreur de connexion interne" 
              }
            )
        } 
        sender = {
          id: sender[0].id,
          name: sender[0].name,
          profileImg: sender[0].image
        }
        comment.senderInfos = sender
      }))
  
      return {...post, comments : comments}
    }))

    posts = await Promise.all(posts.map(async post => {
      let images = await post_imgsModel.getImagesByPost(post.id)
      if (images.code) {
        return res
          .status(500)
          .json(
            { 
              message: "Erreur de connexion interne"  
            }
          )
      } 
      return {...post, images : images}
    }))
  
    return res
      .status(200)
      .json(
        { 
          posts: posts, tag: req.body.tag
        }
      )
  } else {
    return res
      .status(200)
      .json(
        { 
          message: `Il n'y a pas encore de posts enregistrés pour le tag '${req.body.tag}'` 
        }
      )
  }
}

exports.createPost = async (req, res) => {
  console.log("coucou");
  // We initialize a postId variable to store its id and use it later to register images in database
  let imagesPost = req.files?.imagesPost ? req.files.imagesPost : null,
    postId = null

  await postModel.createPost(
    req.body.title,
    req.body.youtube_id,
    req.body.description,
    req.body.link,
    req.body.tag,
    req.body.userId
  ).then(dbResponse => {
    console.log("Post created succesfully", dbResponse)
    postId = dbResponse.insertId
  })
  .catch(err => console.log(err))

  // Authorize four pics max per post
  if (imagesPost && imagesPost.length > 1) {
    if (imagesPost.length > 4) {
      return res
        .status(500)
        .json(
          { 
            message: "Vous ne pouvez pas mettre plus de 4 images" 
          }
        )
    } 

    imagesName = FileUploader.uploadFiles(imagesPost, postId, 'post_img')
    console.log("imagesName =>", imagesName)

    for (let i = 0; i < imagesPost.length; i++) {
      await post_imgsModel.insertImage(imagesName[i], postId)

      imagesPost[i].mv("public/uploads/posts/" + imagesName[i], function (err) {
        if(err) {
          console.log("ERR TO MOVE FILE =>", err)
            return res
              .status(500)
              .json(
                {
                  message: "Problème de connexion"
                }
              )
        }
      })
    }

    return res
      .status(201)
      .json(
        { 
          message: "Post avec images créé" 
        }
      )
  } else if (imagesPost) {
    imageName = FileUploader.uploadFile(imagesPost, {postId: postId, flag: 'posts_images'})

    await post_imgsModel.insertImage(imageName, postId)

    imagesPost.mv("public/uploads/posts/" + imageName, function (err) {
      console.log(imagesPost, imageName)
      if(err) {
        console.log("ERR TO MOVE FILE =>", err)
          return res
            .status(500)
            .json(
              {
                message: "Problème de connexion"
              }
            )
      } else {
        return res
          .status(201)
          .json(
            { 
              message: "Post avec une image créé" 
            }
          )
      }
    })
    
  } else {
    return res
      .status(201)
      .json(
        { 
          message: "Post sans images créé" 
        }
      )
  }
}

exports.editPost = async (req, res) => {
  // Now we can edit the post
  await postModel.editPost(
    req.body.title,
    req.body.youtube_id,
    req.body.description,
    req.body.link,
    req.body.postId
  ).then(response => {
    res
      .status(201)
      .json(
        { 
          message: "Post mis à jour avec succès" 
        }
      )
  }).catch(err => {
    res
      .status(500)
      .json(
        { 
          error: "Le post n'a pu être mis à jour correctement" 
        }
      )
  })
}

exports.deletePost = async (req, res) => {
  // to delete imgs in public/uploads/posts/ directory we have to grap all images related to the post, in order to loop through and delete each one

  let imagesByPost = await postModel.getAllImagesByPost(Number(req.params.postId))
  console.log("ALL images for the post =>", imagesByPost)

  let imagesNameArray = []
  for (let i = 0; i < imagesByPost.length; i++) {
    imagesNameArray.push(imagesByPost[i].name)
  }
  console.log("images name array =>", imagesNameArray)
  
  await postModel.deletePost(req.params.postId)
        .then(response => {
            if (imagesNameArray.length) {
                FileUploader.deleteFiles(imagesNameArray, 'posts_images')
            }
            return res
              .status(200)
              .json(
                { 
                  message: `Le post a été supprimé` 
                }
              )
        })
        .catch(err => {
            console.log("ERR =>", err)
            return res
              .status(500)
              .send("Connection problem")
        })
}


// handle and delete image for post
exports.addPostImages = async (req, res) => {
  // Use the data set in the request by the middlewares
  await postModel.setUpdateTimestamp(req.body.postId)
  
  if (req.postNewImages.length > 1) {
    const imagesName = FileUploader.uploadFiles(req.postNewImages, req.body.postId, 'post_img')
    console.log("imagesName =>", imagesName)

    for (let i = 0; i < req.postNewImages.length; i++) {
      await post_imgsModel.insertImage(imagesName[i], req.body.postId)
      
      req.postNewImages[i].mv("public/uploads/posts/" + imagesName[i], function (err) {
        if(err) {
          console.log("ERR TO MOVE FILE =>", err)
          return res
            .status(500)
            .json(
              {
                message: "Problème de connexion pour déplacer les fichiers"
              }
            )
        }
      })
    }
    return res
      .status(201)
      .json(
        { 
          message: `${req.postNewImages.length} images ajoutées` 
        }
      )
      
  } else if (req.postNewImages) {
      let imageName = FileUploader.uploadFile(req.postNewImages, {postId: req.body.postId, flag: 'posts_images'})
      console.log("name image =>", imageName)
      
      await post_imgsModel.insertImage(imageName, req.body.postId)
      req.postNewImages.mv("public/uploads/posts/" + imageName, function (err) {
        console.log(req.postNewImages, imageName)
        if(err) {
          console.log("ERR TO MOVE FILE =>", err)
            return res
              .status(500)
              .json(
                {
                  message: "Problème de connexion pour déplacer le fichier"
                }
              )
        } 
      })
      return res.status(201).send("Ume image ajoutée")
  } 
}

exports.deletePostImage = async (req, res) => {
  console.log("images to delete in req =>", req.imagesToDelete);
  
  for (let i = 0; i < req.body.imageIds.length; i++) {
    await post_imgsModel.deleteImageById(req.imagesToDelete[i].id)
    .then(response => {
      FileUploader.deleteFile(req.imagesToDelete[i].name, 'posts_images')
    })
    .catch(err => {
      console.log(`La suppression de l'image ${req.imagesToDelete[i].name} a générée une erreur`, err)
      return res
        .status(500)
        .json(
          {
            message: `La suppression de l'image ${req.imagesToDelete[i].name} a générée une erreur`
          }
        )
    } )
  }

  return res
    .status(204)
    .json(
      { 
        message: `${req.imagesToDelete.length === 1 ? "L'image a bien été supprimée" : "Les images ont bien été supprimées"}` 
      }
    )
}