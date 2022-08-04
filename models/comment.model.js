const pool = require("../config/database").pool;

exports.getAllByPost = async (postId) => {
  let query = "SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC"
  return pool
    .then(connection => connection.query(query, [postId]))
    .catch(err => console.log(err))
}

exports.getById = async (commentId) => {
  let query = "SELECT * FROM comments WHERE id = ?"
  return pool
    .then(connection => connection.query(query, [commentId]))
    .catch(err => console.log(err))
}

exports.create = async (comment, userId, postId) => {
  let query = `INSERT INTO comments (comment, user_id, post_id) VALUES (?, ?, ?)`
  return pool
  .then(connection => connection.query(query, [comment, userId, postId]))
  .catch(err => console.log(err))
}

exports.read = async (id) => {
  let query = "SELECT * FROM comments WHERE id = ?"
  return pool
    .then(connection => connection.query(query, [id]))
    .catch(err => console.log(err))
}

exports.update = async (comment, comment_id) => {
  let query = "UPDATE comments SET comment = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?"
  return pool
    .then(connection => connection.query(query, [comment, comment_id]))
}

exports.deleteComment = async (id) => {
  let query = "DELETE FROM comments WHERE id = ?"
  return pool
    .then(connection => connection.query(query, [id]))
    .catch(err => console.log(err))
}