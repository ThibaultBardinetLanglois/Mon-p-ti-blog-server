const pool = require("../config/database").pool;

exports.getLastPosts = async () => {
  let query = "SELECT * FROM posts ORDER BY created_at DESC LIMIT 5"
  return pool
    .then(connection => connection.query(query))
} 

exports.setUpdateTimestamp = async (postId) => {
  let query = "UPDATE posts SET updated_at=CURRENT_TIMESTAMP() WHERE id = ?"
  return pool
      .then(connection => connection.query(query, [postId]))
      .catch(err => console.log(err))
}

exports.getAllByUser = async (id) => {
  let query = "SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC"
  return pool
    .then(connection => connection.query(query, [id]))
    .catch(err => console.log(err))
}

exports.getAllByUserAndTag = (userId, tag) => {
  let query = "SELECT * FROM posts WHERE user_id = ? AND tag = ? ORDER BY created_at DESC"
  return pool
    .then(connection => connection.query(query, [userId, tag]))
    .catch(err => console.log(err))
}

exports.createPost = async (title, youtube_id, description, link, tag, userId) => {
  let query = "INSERT into posts (title, youtube_id, description, link, tag, user_id) VALUES (?, ?, ?, ?, ?, ?)"
  return pool
    .then(connection => connection.query(query, [title, youtube_id, description, link, tag, userId]))
    .catch(err => console.log(err))
}

exports.editPost = async (title, youtube_id, description, link, tag, postId) => {
  let query = "UPDATE posts SET title = ?, youtube_id = ?, description = ?, link = ?, tag = ?, updated_at=CURRENT_TIMESTAMP() WHERE id = ?"
  return pool
    .then(connection => connection.query(query, [title, youtube_id, description, link, tag, postId]))
    .catch(err => console.log(err))
}

exports.getPostById = async (postId) => {
  let query = "SELECT * FROM posts WHERE id = ?"
  return pool
    .then(connection => connection.query(query, [postId]))
    .catch(err => console.log(err))
}

exports.getItemWithMaxId = async () => {
  let query = "SELECT * FROM posts ORDER BY id DESC LIMIT 0, 1"
  return pool
    .then(connection => connection.query(query))
    .catch(err => console.log(err))
}

exports.getAllImagesByPost = async (postId) => {
  let query = "SELECT * FROM post_images WHERE post_id = ?"
  return pool
    .then(connection => connection.query(query, [postId]))
    .catch(err => console.log(err))
}

exports.deletePost = async (postId) => {
  let query = "DELETE FROM posts WHERE id = ?"
  return pool
    .then(connection => connection.query(query, [postId]))
    .catch(err => console.log(err)) 
}
