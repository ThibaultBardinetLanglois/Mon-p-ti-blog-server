const router = require('express').Router(),
  postRoutes = require('../controllers/post.controller'),
  auth = require('../middlewares/auth.middleware'),
  postRequestVerifications = require('../middlewares/content-verifications/postRequestVerification.middleware'),
  postDBVerifications = require('../middlewares/database-verifications/postDBVerifications.middleware');

// Retrieve posts
router.get(
  '/last-posts', 
  postRoutes.getLastPostsForNoLogged
)

router.get(
  '/posts-by-user/:userId', 
  auth.verifyToken, 
  postRequestVerifications.postsByUser,
  postRoutes.getPostsByUser
)

router.get(
  '/posts-by-user-and-tag', 
  auth.verifyToken, 
  postRequestVerifications.postsByUserAndTag,
  postRoutes.getPostsByUserAndTag
)

// Post CRUD
router.post(
  '/create', 
  auth.verifyToken,
  postRequestVerifications.createPost, 
  auth.checkUserIdInBodyRequest,
  postRoutes.createPost
)

router.put(
  '/edit', 
  auth.verifyToken, 
  postDBVerifications.editPost,
  auth.checkUserIdInBodyRequest,
  postRequestVerifications.editPost,
  postRoutes.editPost
)

router.delete(
  '/:postId', 
  auth.verifyToken, 
  postDBVerifications.checkIfPostExistUsingParams,
  postRequestVerifications.deletePost,
  postDBVerifications.deletePost,
  postRoutes.deletePost
)

// handle add and delete image for post
router.post(
  '/image/add', 
  auth.verifyToken, 
  postRequestVerifications.addImagesToPost,
  postDBVerifications.retrieveImagesPerPost,
  postRequestVerifications.checkImgsCountForPost,
  postRoutes.addPostImages
)

router.delete(
  '/image/delete', 
  auth.verifyToken, 
  postDBVerifications.checkIfPostExistUsingRequestBody,
  postRequestVerifications.deleteImagesPost,
  postDBVerifications.deletePostImages,
  postRoutes.deletePostImage
)


module.exports = router