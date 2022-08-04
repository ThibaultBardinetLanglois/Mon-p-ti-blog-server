const pool = require('../config/database').pool;

// To check if a like already exist and avoid to duplicate it
exports.getLikeByUserAndPostId = async (userId, postId) => {
  let query = "SELECT * FROM post_likes WHERE user_id = ? AND post_id = ?"

  return pool
    .then(connection => connection.query(query, [userId, postId]))
    .catch(err => console.log(err))
}

exports.getLikesCountForPost = async (postId) => {
  let query = "SELECT post_id, COUNT(*) FROM post_likes WHERE post_id = ?"

  return pool
    .then(connection => connection.query(query, [postId]))
    .catch(err => console.log(err))
}

exports.getUsersWhoLikePost = async (postId) => {
  let query = "SELECT name, role, image, pl.user_id, pl.post_id FROM users as u INNER JOIN post_likes as pl on u.id = pl.user_id WHERE pl.post_id = ?"
  return pool
    .then(connection => connection.query(query, [postId]))
    .catch(err => console.log(err))
}

exports.addLike = async (postId, userId) => {
  let query = "INSERT INTO post_likes (post_id, user_id) VALUES(?, ?)"
  return pool
  .then(connection => connection.query(query, [postId, userId]))
  .catch(err => console.log(err))
}

exports.deleteLike = async (postId, userId) => {
  let query = "DELETE FROM post_likes WHERE post_id = ? AND user_id = ?"
  return pool
    .then(connection => connection.query(query, [postId, userId]))
    .catch(err => console.log(err))
}