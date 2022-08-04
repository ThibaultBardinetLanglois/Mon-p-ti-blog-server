const pool = require("../config/database").pool;

const bcrypt = require('bcrypt')
const saltRounds = 10


exports.getAllUnlessUserId = async (userId) => {
    let query = `SELECT id, name, image from users WHERE id != ? AND name !="Admin" ORDER BY name`
    return pool
      .then(connection => connection.query(query, [userId]))
      .catch(err => console.log(err))
}

exports.createUser = async (name, email, password) => {
    if(!name.length > 0 || !email.length > 0 || !password.length > 0) return Promise.reject(
        new Error("name or email or password length is empty or undefined")
    )
    return bcrypt.hash(password, saltRounds)
            .then(hash => {
                let query = "INSERT INTO users (name, email, password, role, image, description, passions) VALUES (?, ?, ?, 'user', null, null, null)"
                return pool
                    .then(connection => connection.query(query, [name, email, hash])) 
                    .catch(err => console.log(err))
            })
}

exports.editUser = async (user) => {
    let query = `UPDATE users SET name = ?, email = ?, image = ?, description = ?, passions = ? WHERE id = ?`
    return pool
      .then(connection => connection.query(query, [
        user.name,
        user.email,
        user.image,
        user.description,
        user.passions,
        user.id
      ]))
      .catch(err => console.log(err))
}

// here we want to retrieve all registered users wich are not in the friend's list of the user
exports.getAllForFilteredSearch = async (userId) => {
    let query = `SELECT id, name, image
        FROM users
        WHERE id NOT IN (
        SELECT u.id as user_id
        FROM users as u
        INNER JOIN user_friends on user_friends.friend_user_id = u.id
        WHERE user_friends.user_id = ? AND (status = 'active' OR status = 'pending')
        UNION 
        SELECT u.id as user_id
        FROM users as u INNER JOIN user_friends on user_friends.user_id = u.id
        WHERE user_friends.friend_user_id = ? AND (status = 'active' OR status = 'pending')
        UNION
        SELECT u.id
        FROM users as u
        WHERE u.id = ?
        )`
    return pool
        .then(connection => connection.query(query, [userId, userId, userId]))
        .catch(err => console.log(err))
}

exports.getUserWithMaxId = async () => {
    let query = "SELECT * FROM users ORDER BY id DESC LIMIT 0, 1"
    return pool
      .then(connection => connection.query(query))
      .catch(err => console.log(err))
}  

exports.getUserById = async (id) => {
    let query = "SELECT * FROM users WHERE id = ?";
    return pool
        .then(connection => connection.query(query, [id]))
        .catch(err => console.log(err))
}

exports.getUserByName = async (name) => {
    let query = "SELECT * FROM users WHERE name = ?";
    return pool
        .then(connection => connection.query(query, [name]))
        .catch(err => console.log(err))
}

exports.getUserByEmail = async (email) => {
    console.log("user model, email send =>", email);
    let query = "SELECT * FROM users WHERE BINARY email = ?";
    return pool
        .then(connection => connection.query(query, [email]))
        .catch(err => console.log(err))
}

exports.getUserByRole = async (role) => {
    let query = "SELECT * FROM users WHERE role = ?";
    return pool
        .then(connection => connection.query(query, [role]))
        .catch(err => console.log(err))
}

exports.setConnectionTimestamp = async (email) => {
    let query = "UPDATE users SET last_connection=CURRENT_TIMESTAMP() WHERE email = ?"
    return pool
        .then(connection => connection.query(query, [email]))
        .catch(err => console.log(err))
}

exports.getAllPostsByUser = async (userId) => {
    let query = "SELECT * FROM posts WHERE user_id = ?"
    return pool
        .then(connection => connection.query(query, [userId]))
        .catch(err => console.log(err))
}

exports.getAllImagesByPost = async (postId) => {
    console.log("model =>", postId)
    let query = "SELECT * FROM post_images WHERE post_id = ?"
    return pool
        .then(connection => connection.query(query, [postId]))
        .catch(err => console.log(err))  
}

exports.deleteUser = async (id) => {
    let query = "DELETE FROM users WHERE id = ?"
    return pool
        .then(connection => connection.query(query, [id]))
        .catch(err => console.log(err))  
}

exports.setNewCsrfToken = async (newCsrfToken,  userId) => {
    let query = "UPDATE users SET csrf_token = ? WHERE id = ?"
    return pool
        .then(connection => connection.query(query, [newCsrfToken, userId]))
        .catch(err => console.log(err))  
}



