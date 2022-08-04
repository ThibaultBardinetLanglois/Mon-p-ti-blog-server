const router = require('express').Router(),
  user = require('./user.routes'),
  userFriends = require('./user_friends.routes'),
  post = require('./post.routes'),
  comment = require('./comment.routes'),
  postLikes = require('./post_likes.routes'),
  csrfToken = require('./csrf_token.routes'),
  rateLimitOptions = require('../utils/rateLimitOptions');


router.use('/user', user)

router.use(
  '/user-friends', 
  rateLimitOptions.apiLimiter, 
  userFriends
)

router.use(
  '/post', 
  rateLimitOptions.apiLimiter, 
  post
)

router.use(
  '/post-comments', 
  rateLimitOptions.apiLimiter,
  comment
)

router.use(
  '/post-likes', 
  rateLimitOptions.apiLimiter,
  postLikes
)

// Route to get the CSRF Token for all pages which interact with the data by a form and post, put, delete methods
router.use('/csrf_security', csrfToken)

module.exports = router
