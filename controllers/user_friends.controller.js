const user_friendsModel = require('../models/user_friends.model'),
  userModel = require('../models/user.model'),
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

exports.getRelationIfItExists = async (req, res) => {
  const { userId, potentialFriendId } = req.params
  console.log("userid :", userId, "potential friend id :", potentialFriendId);
  await user_friendsModel.getRelationIfItExists(userId, potentialFriendId)
    .then(([relation]) => {
      res
        .status(200)
        .json(
          {
            relation: relation
          }
        )
    })
    .catch(err => {
      res
        .status(500)
        .json(
          {
            message: "Erreur lors de la connection avec la base de données"
          }
        )
    })
}

// Get all friends recommandations for the actual user
exports.getAllFriendsRecommandationsByUser = async (req, res) => {
  // Retrieve all friends and invitations send and received by the user, put all of them in an array
  let userFriendsList = await user_friendsModel.getAllFriendsByUser(req.params.userId)
  const receivedInvitationsByUser = await user_friendsModel.getAllPendingInvitationsReceivedByUser(req.params.userId)
  const sentInvitationsByUser = await user_friendsModel.getAllPendingInvitationsSentByUser(req.params.userId)
  userFriendsList = [...userFriendsList, ...receivedInvitationsByUser, ...sentInvitationsByUser]

  let friendsOfFriends = await Promise.all(
    userFriendsList.map(
      async friend => {
        let friendsFriend = await user_friendsModel.getAllFriendsByUser(friend.user_id)
        
        for (let i = 0; i < friendsFriend.length; i++) {
          let isAlreadyUserFriend = false

          if (friendsFriend[i].user_id !== req.decodedToken.id) {
            for (let j = 0; j < userFriendsList.length; j++) {
              if (friendsFriend[i].user_id === userFriendsList[j].user_id) {
                //console.log('in user friend list :', friendsFriend[i])
                isAlreadyUserFriend = true
              }
            }

            //We remove all users recommended by another user whose are in a pending relation with the main user
            if (receivedInvitationsByUser.length) {
              for(k = 0; k < receivedInvitationsByUser.length; k++) {
                if(receivedInvitationsByUser[k].user_id === friend.user_id) {
                  isAlreadyUserFriend = true
                }
              }
            }

            if(sentInvitationsByUser.length) {
              for(l = 0; l < sentInvitationsByUser.length; l++) {
                if(sentInvitationsByUser[l].user_id === friend.user_id) {
                  isAlreadyUserFriend = true
                }
              }
            }

            if (isAlreadyUserFriend === false) {
              console.log("FriendsFriend : ", friendsFriend[i], "friend : ", friend)
              
              let recommendedFriend = {}
              recommendedFriend.friend = friendsFriend[i]
              recommendedFriend.friendInCommon = friend
              return recommendedFriend
            }
          }

        }

       // return {friend: friendsFriend, friendInCommon: friend}
        //if (Object.keys(recommendedFriend).length > 0) return recommendedFriend
      }
    )
  )
  
  // reformatte friendsOfFriends to avoid nul item
  friendsOfFriends = friendsOfFriends.filter(item => item)
  
  // Create a new array, loop to friendsOffFriends array, if new array doesn't have the recommended user yet push it in, if new has already the recommended user in him we increment a common_friends_count and attach the commonUser to the recommended friend
  let formattedRecommendedFriends = []
  let recommandedFriendsId = []
    for(let i = 0; i < friendsOfFriends.length; i++) {
      if (!recommandedFriendsId.includes(friendsOfFriends[i].friend.user_id)) {
        recommandedFriendsId.push(friendsOfFriends[i].friend.user_id)
        let addedFriend = {}
        addedFriend.recommendedFriend = {...friendsOfFriends[i].friend}
        addedFriend.common_friends = [{...friendsOfFriends[i].friendInCommon}]
        addedFriend.common_friends_count = 1
        formattedRecommendedFriends = [...formattedRecommendedFriends, addedFriend]
      } else {
        for(let j = 0; j < formattedRecommendedFriends.length; j++) {
          if (formattedRecommendedFriends[j].recommendedFriend.user_id === friendsOfFriends[i].friend.user_id) {
            formattedRecommendedFriends[j].common_friends_count++
            formattedRecommendedFriends[j].common_friends = [...formattedRecommendedFriends[j].common_friends, {...friendsOfFriends[i].friendInCommon}]
          }
        }
      }
    }

  return res.status(200).send(formattedRecommendedFriends)
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
  await user_friendsModel.getAllPendingInvitationsSentByUser(req.params.userId)
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
    await user_friendsModel.getAllPendingInvitationsReceivedByUser(req.params.userId)
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
      
      // Format post date
      post.post_created_at = utils.formatDate(post.post_created_at)
      if(post.post_updated_at) post.post_updated_at = utils.formatDate(post.post_updated_at)
      return {...post, likes: likesSenders}
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

        // Format comment date
        comment.created_at = utils.formatDate(comment.created_at)
        if(comment.updated_at) comment.updated_at = utils.formatDate(comment.updated_at)
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
