const router = require('express').Router(),
  post_likesRoutes = require('../controllers/post_likes.controller'),
  auth = require('../middlewares/auth.middleware'),
  post_likesBodyRequestVerifications = require('../middlewares/content-verifications/post_likesRequestVerification.middleware'),
  post_likesDBVerifications = require('../middlewares/database-verifications/post_likesDBVerification.middleware');


router.get(
  '/get-users-who-like-post', 
  post_likesBodyRequestVerifications.getUsersWhoLikePost,
  post_likesDBVerifications.getUsersWhoLikePost,
  post_likesRoutes.getUsersWhoLikePost
)

router.post(
  '/add', 
  auth.verifyToken, 
  post_likesBodyRequestVerifications.checkFieldsPresence,
  auth.checkUserIdInBodyRequest,
  post_likesDBVerifications.add,
  post_likesRoutes.addLike
)

router.delete(
  '/delete', 
  auth.verifyToken, 
  post_likesBodyRequestVerifications.checkFieldsPresence,
  auth.checkUserIdInBodyRequest,
  post_likesDBVerifications.delete,
  post_likesRoutes.deleteLike
)

module.exports = router