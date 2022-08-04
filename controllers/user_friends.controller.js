const user_friendsModel = require('../models/user_friends.model'),
  userModel = require('../models/user.model'),
  postModel = require("../models/post.model"),
  post_imgsModel = require("../models/post_images.model"),
  post_likesModel = require("../models/post_likes.model"),
  commentsModel = require('../models/comment.model');


exports.getAllFriendsByUser = async (req, res) => {
  // Retrieve all user's friends
  let userFriends = await user_friendsModel.getAllFriendsByUser(req.params.userId)
  console.log("USER FRIENDS =>", userFriends)
  if (userFriends.code) {
    return res
      .status(500)
      .json(
        { 
          message: "Erreur de connexion interne à la base de données" 
        }
      )
  } 

  if (!userFriends.length) {
    return res
      .status(200)
      .json(
        {
          message: "Vous n'avez aucun ami pour l'instant"
        }
      )
  } else {
    return res
      .status(200)
      .json(
        {
          friendsCount: userFriends.length,
          userFriends: userFriends
        }
      )
  }
}

// Get all friends recommandations for the actual user
exports.getAllFriendsRecommandationsByUser = async (req, res) => {
  // Retrieve all user's friends
  let userFriends = await user_friendsModel.getAllFriendsByUser(req.body.userId)
  console.log("USER FRIENDS =>", userFriends)
  if (userFriends.code) {
    return res
      .status(500)
      .json(
        { 
          err: "Problème de connexion interne à la base de données" 
        }
      )
  } 

  // retrieve all friends's friends of the user
  let recommendedFriends = [],
    friendsOfFriends = []
  await Promise.all(userFriends.map(async friend => {
    console.log("FRIEND =>", friend)
    let friendFriends = await user_friendsModel.getAllFriendsByUser(friend.user_id)
    if (friendFriends.code) {
      return res
        .status(500)
        .json(
          { 
            message: "Problème de connexion interne à la base de données" 
          }
        )
    } 

    // Remove the objects containing user who is connected
    friendFriends = friendFriends.filter(friend => friend.user_id !== req.body.userId)
    console.log(`Amis de ${friend.user_name} => ${friendFriends}`)
    friendsOfFriends.push({friend: friend, friendsFriend: {...friendFriends}})

    // Among this list make an array of friends who are not in the friend's user list
    for (let i = 0; i < friendFriends.length; i++) {
      let checkIfExist = userFriends.find(friend => friend.user_id === friendFriends[i].user_id)
      if (!checkIfExist) {
        // get a request to the database to see if user has a pending request about each recommended user, if not keep it in the array.
        let seeRelation = await user_friendsModel.isTherePendingRelation(req.body.userId, friendFriends[i].user_id)

        if (seeRelation.code) {
          return res
            .status(500)
            .json(
              { 
                err: "Problème de connexion interne à la base de données" 
              }
            )
        } 
        console.log(`See the relation beetween user ${req.body.userId} and user ${friendFriends[i].user_id}`)
        console.log("relation in db =>", seeRelation)

        if (!seeRelation.length) {
          // We add the original friend to the object in userFriend
          let recommendedFriend = friendFriends[i]
          recommendedFriend.userFriend = { id : friend.user_id, name: friend.user_name, imageProfile: friend.user_profile_img }
          console.log("RECOMMEDED FRIEND =>", recommendedFriend)
          recommendedFriends = [...recommendedFriends, recommendedFriend]
        }
      }
      console.log("already exist in list =>", checkIfExist)
    }
    console.log("Potential friends =>", recommendedFriends)
  }))
  
  // Reformat friends recommandations
  let reformatedFriendsRecommandations = []
  for (let i = 0; i < recommendedFriends.length; i++) {
    let friendsInCommonCount = 0
    let object = {}
    object.id = recommendedFriends[i].user_id
    object.name = recommendedFriends[i].user_name
    object.profileImg = recommendedFriends[i].user_profile_img
    object.friendsInCommonCount = friendsInCommonCount

    let findIfInArray = reformatedFriendsRecommandations.find(person => person.id === recommendedFriends[i].user_id)
    if (!findIfInArray) {
      object.friendsInCommon = [recommendedFriends[i].userFriend]
      object.friendsInCommonCount++
      reformatedFriendsRecommandations = [...reformatedFriendsRecommandations, object]
    } else {
      // console.log("FIND =>", findIfInArray)
      findIfInArray.friendsInCommonCount++
      findIfInArray.friendsInCommon = [...findIfInArray.friendsInCommon, recommendedFriends[i].userFriend]
    }
  }
  reformatedFriendsRecommandations = reformatedFriendsRecommandations.sort((a, b) => b.friendsInCommonCount - a.friendsInCommonCount)
  friendsOfFriends.push({FriendsRecommandations : reformatedFriendsRecommandations})

  // For the friend research page we just want to send the recommandations
  return res
    .status(200)
    .json(
      { 
        FriendsRecommandations: reformatedFriendsRecommandations 
      }
    )
}

exports.proposeToBeFriend = async (req, res) => {
  await user_friendsModel.proposeToBeFriend(req.body.userId, req.body.friendId)
    .then(response => {
      res
        .status(201)
        .json(
          { 
            message: `Vous avez envoyé une demande d'ami à ${req.friendName}` 
          }
        )
    })
    .catch(err => {
      console.log("ERROR =>", console.log(err))
      return res
        .status(500)
        .json(
          { 
            error: "Il ya un problème de connexion" 
          }
        )
    })
}

exports.getAllPendingInvitationsSentByUser = async (req, res) => {
  await user_friendsModel.getAllPendingInvitationsSentByUser(req.body.userId)
    .then(response => {
      if (response.length) {
        return res
          .status(200)
          .json(
            { 
              message: `Vous avez` + (response.length > 1 ? ` envoyé des invitations qui sont encore en attente` : ` envoyé une invitation qui est encore en attente`), 
              invitations: response 
            }
          )
      } else {
        return res
          .status(200)
          .json(
            { 
              message: `Vous n'avez pas envoyé d'invitations qui soient encore en attente` 
            }
          )
      }
    })
    .catch(err => {
      console.log("ERROR =>", console.log(err))
      return res
        .status(500)
        .json(
          { 
            message: "Il ya un problème de connexion interne à la base de données" 
          }
        )
    })
  
}

exports.getAllPendingInvitationsReceivedByUser = async (req, res) => {
    await user_friendsModel.getAllPendingInvitationsReceivedByUser(req.body.userId)
      .then(response => {
        if (response.length) {
          res
            .status(200)
            .json(
              { 
                message: `Vous avez` + (response.length > 1 ? ` reçu ${response.length} invitations qui sont encore en attente` : ` ${response.length} reçu une invitation qui est encore en attente`), 
                invitations: response 
              }
            )
        } else {
          res
            .status(200)
            .json(
              { 
                message: `Vous n'avez pas reçu d'invitations qui soient encore en attente` 
              }
            )
        }
      })
      .catch(err => {
        console.log("ERROR =>", console.log(err))
        if (!friend.length) {
          return res
            .status(500)
            .json(
              { 
                error: "Il ya un problème de connexion interne à la base de données" 
              }
            )
        } 
      })
}

exports.validateToBeFriend = async (req, res) => {
  await user_friendsModel.validateToBeFriend(req.body.relationId)
    .then(response => {
      res
        .status(201)
        .json(
          { 
            message: `Vous avez accepté l'invitation de ${req.newFriendName}`,
            newFriend: {
              name: req.newFriendName,
              image: req.newFriendImage
            } 
          }
        )
    })
    .catch(err => {
      console.log("ERROR =>", console.log(err))
      return res
        .status(500)
        .json(
          { 
            message: "Il ya un problème de connexion" 
          }
        )
    })
}

exports.deleteFriend = async (req, res) => {
  await user_friendsModel.deleteFriend(req.body.relationId)
    .then(response => {
      res.status(204).send("Vous venez de supprimer cet ami de vos relations")
        
    })
    .catch(err => {
      console.log("ERROR =>", console.log(err))
      return res
        .status(500)
        .json(
          { 
            message: "Il ya un problème de connexion" 
          }
        )
    })
}

exports.areWeFriend = async (req, res) => {
  await user_friendsModel.areWeFriend(req.body.userId, req.body.potentialFriendId)
    .then(response => {
      if (response.length) {
        return res
          .status(200)
          .json(
            { 
              message: `Vous êtes bien ami avec ${req.potentialFriendName}`, 
              areWeFriend: true,
              friend: {
                name: req.potentialFriendName,
                image: req.potentialFriendImage
              } 
            }
          )
      } else {
        return res
          .status(200)
          .json(
            { 
              message: `Vous n'êtes pas ami avec ${req.potentialFriendName}`, areWeFriend: false 
            }
          )
      }
      
    })
    .catch(err => {
      console.log("ERROR =>", console.log(err))
      return res
        .status(500)
        .json(
          { 
            message: "Problème de connexion interne à la base de données" 
          }
        )
    })
}

exports.getAllFriendsPostsByUser = async (req, res) => {
  let posts = []

  // get posts for friends who the user has invited
  let primaryPosts = await user_friendsModel.getAllFriendsPostsByUserPrimary(req.params.userId)
  if (primaryPosts.code) {
    return res
      .status(500)
      .json(
        { 
          message: "Erreur de connexion interne à la base de données" 
        }
      )
  } 
  
  // get posts for friends who have invited the user
  let secondaryPosts = await user_friendsModel.getAllFriendsPostsByUserSecondary(req.params.userId)
  if (secondaryPosts.code) {
    return res
      .status(500)
      .json(
        { 
          message: "Erreur de connexion interne à la base de données" 
        }
      )
  }

  // put all the posts in an array
  posts.push(...primaryPosts)
  posts.push(...secondaryPosts)
  posts.sort((a, b) => {
    return b.post_created_at - a.post_created_at;
  })


  // Get likes count for each post if it exist
  if (posts.length > 0) {
    posts = await Promise.all(posts.map(async post => {
      let likesCount = await post_likesModel.getLikesCountForPost(post.post_id)
      if (likesCount.code) {
        return res
          .status(500)
          .json(
            { 
              message: "Erreur de connexion interne à la base de données" 
            }
          )
      } 
      
      return {...post, likesCount: likesCount[0]["COUNT(*)"]}
    }))
    
    // Get comments for each post if it exist
    posts = await Promise.all(posts.map(async post => {
      let comments = await commentsModel.getAllByPost(post.post_id)
      if (comments.code) {
        return res
          .status(500)
          .json(
            { 
              message: "Erreur de connexion interne à la base de données" 
            }
          )
      } 
  
      // Get info about the users who have commented the post
      await Promise.all(comments.map(async comment => {
        let sender = await userModel.getUserById(comment.user_id)
        if (sender.code) {
          return res
            .status(500)
            .json(
              { 
                message: "Erreur de connexion interne à la base de données" 
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

    // Retrieve all the pics attached to the post if it exist
    posts = await Promise.all(posts.map(async post => {
      let images = await post_imgsModel.getImagesByPost(post.post_id)
      if (images.code) {
        return res
          .status(500)
          .json(
            { 
              message: "Erreur de connexion interne à la base de données" 
            }
          )
      } 

      delete post.relation_id
      return {...post, images : images}
    }))
  
    return res
      .status(200)
      .json(
        { 
          posts: posts 
        }
      )
  } else {
    return res
      .status(200)
      .json(
        { 
          message: "Il n'a pas encore de posts enregistrés" 
        }
      )
  }
}
