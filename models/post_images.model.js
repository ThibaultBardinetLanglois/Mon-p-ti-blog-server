const pool = require("../config/database").pool;

exports.getImageById = async (imageId, postId) => {
  let query = "SELECT * FROM post_images WHERE id = ? AND post_id = ?"
  return pool
    .then(connection => connection.query(query, [imageId, postId]))
    .catch(err => console.log(err))
}

exports.getImagesByPost = async (postId) => {
  let query = "SELECT * FROM post_images WHERE post_id = ?"
  return pool
    .then(connection => connection.query(query, [postId]))
    .catch(err => console.log(err))
}

exports.insertImage = async (imageName, postId) => {
  let query = `INSERT INTO post_images(name, post_id) VALUES (?, ?)`
  return pool
  .then(connection => connection.query(query, [imageName, postId]))
  .catch(err => console.log(err))
}

exports.deleteImageById = async (imageId) => {
  let query = "DELETE FROM post_images WHERE id = ?"
  return pool
    .then(connection => connection.query(query, [imageId]))
    .catch(err => console.log(err))
}

exports.deleteImageByName = async (imageName) => {
  let query = "DELETE FROM post_images WHERE name = ?"
  return pool
    .then(connection => connection.query(query, [imageName]))
    .catch(err => console.log(err))
}