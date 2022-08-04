const pool = require('../config/database').pool;

exports.getRelationById = async (relationId) => {
  let query = "SELECT * FROM user_friends WHERE id = ?"
  return pool
    .then(connection => connection.query(query, [relationId]))
}

exports.getAllFriendsByUser = async (userId) => {
  let query = "SELECT u.id as user_id, u.name as user_name, u.image as user_profile_img, u.last_connection as user_last_connection, user_friends.id as relation_id"
  + " FROM users as u"
  + " INNER JOIN user_friends on user_friends.friend_user_id = u.id" 
  + ` WHERE user_friends.user_id = ? AND status = 'active'`
  + " UNION" 
  + " SELECT u.id as user_id, u.name as user_name, u.image as user_profile_img, u.last_connection as user_last_connection, user_friends.id as relation_id" 
  + " FROM users as u INNER JOIN user_friends on user_friends.user_id = u.id" 
  + ` WHERE user_friends.friend_user_id = ? AND status = 'active'`
  + " ORDER BY user_name"

  return pool
    .then(connection => connection.query(query, [userId, userId]))
    .catch(err => console.log(err))
}

// get all invitations in pending sent by a user (user id who have sent the invitation is in user_id field, and the friend who received the invitation is in friend_user_id)
exports.getAllPendingInvitationsSentByUser = async (userId) => {
  let query = "SELECT u.id as user_id, u.name as user_name, u.image as user_profile_img, u.last_connection as user_last_connection, user_friends.id as relation_id FROM users as u  INNER JOIN user_friends on user_friends.friend_user_id = u.id WHERE user_friends.user_id = ? AND status = 'pending'"
  return pool
    .then(connection => connection.query(query, [userId]))
    .catch(err => console.log(err))
}

// On the contrary when a user logs in, a automatic request is made to verify if he has some new invitations proposed, in this case the user is represented by the friend_id and the relation status must be to 'pending'
exports.getAllPendingInvitationsReceivedByUser = async (userId) => {
  let query = "SELECT u.id as user_id, u.name as user_name, u.image as user_profile_img, u.last_connection as user_last_connection, user_friends.id as relation_id FROM users as u  INNER JOIN user_friends on user_friends.user_id = u.id WHERE user_friends.friend_user_id = ? AND status = 'pending'"
  return pool
    .then(connection => connection.query(query, [userId]))
    .catch(err => console.log(err))
}

exports.proposeToBeFriend = async (userId, friendId) => {
  console.log("Coucou in model friends")
  let query = "INSERT INTO user_friends (status, user_id, friend_user_id) VALUES ('pending', ?, ?)"
  return pool
    .then(connection => connection.query(query, [userId, friendId]))
    .catch(err => console.log(err))
}

exports.validateToBeFriend = async (relationId) => {
  let query = "UPDATE user_friends SET status = 'active' WHERE id = ?"
  return pool
    .then(connection => connection.query(query, [relationId]))
    .catch(err => console.log(err))
}

exports.deleteFriend = async (relationId, friendId) => {
  let query = "DELETE FROM user_friends WHERE id = ?"
  return pool
    .then(connection => connection.query(query, [relationId]))
    .catch(err => console.log(err))
}

// get all friends posts for a user when he has send the invitation 
exports.getAllFriendsPostsByUserPrimary = async (userId) => {
  let query = "SELECT u.id as user_id, u.name as user_name, u.email as user_email, u.image as user_profile_img, u.last_connection as user_last_connection,"
  + " posts.id as post_id, posts.title as post_title, posts.youtube_id as post_youtube_id, posts.description as post_description, posts.tag as post_tag, posts.link as post_link, posts.created_at as post_created_at,"
  + " user_friends.id as relation_id"
  + " FROM users as u" 
  + " INNER JOIN user_friends on u.id = user_friends.friend_user_id "
  + " INNER JOIN posts on posts.user_id = user_friends.friend_user_id"
  + ` WHERE user_friends.user_id = ? AND user_friends.status = 'active'`
  + " ORDER BY posts.created_at DESC"
  return pool
    .then(connection => connection.query(query, [userId]))
    .catch(err => console.log(err))
}

// get all friends posts for a user when he has received the invitation
exports.getAllFriendsPostsByUserSecondary = async (userId) => {
  let query = "SELECT u.id as user_id, u.name as user_name, u.email as user_email, u.image as user_profile_img, u.last_connection as user_last_connection, posts.id as post_id, posts.title as post_title, posts.youtube_id as post_youtube_id, posts.description as post_description, posts.tag as post_tag, posts.link as post_link, posts.created_at as post_created_at, user_friends.id as relation_id"
  + " FROM users as u" 
  + " INNER JOIN user_friends on u.id = user_friends.user_id"
  + " INNER JOIN posts on posts.user_id = user_friends.user_id"
  + ` WHERE user_friends.friend_user_id = ? AND user_friends.status = 'active'` 
  + " ORDER BY posts.created_at DESC"
  return pool
    .then(connection => connection.query(query, [userId]))
    .catch(err => console.log(err))
}

exports.areWeFriend = async (userId, potentialFriendId) => {
  let query = `SELECT * FROM user_friends WHERE user_id = ? AND friend_user_id = ? AND status = 'active' UNION SELECT * FROM user_friends WHERE friend_user_id = ? AND user_id = ? AND status = 'active'`
  return pool
    .then(connection => connection.query(query, [userId, potentialFriendId, userId, potentialFriendId]))
    .catch(err => console.log(err))
}

exports.isTherePendingRelation = async (userId, potentialFriendId) => {
  let query = `SELECT * FROM user_friends WHERE user_id = ? AND friend_user_id = ? AND status = 'pending' UNION SELECT * FROM user_friends WHERE friend_user_id = ? AND user_id = ? AND status = 'pending'`
  return pool
    .then(connection => connection.query(query, [userId, potentialFriendId, userId, potentialFriendId]))
    .catch(err => console.log(err))
}
