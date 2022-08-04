const router = require('express').Router(),
  commentRoutes = require('../controllers/comment.controller'),
  auth = require('../middlewares/auth.middleware'),
  commentBodyRequestVerifications = require('../middlewares/content-verifications/commentRequestVerification.middleware'),
  commentDBVerifications = require('../middlewares/database-verifications/commentDBVerifications.middleware');

router.get(
  '/:postId', 
  commentBodyRequestVerifications.getAllByPost,
  commentDBVerifications.getAllByPost,
  commentRoutes.getAllByPost
)

router.post(
  '/create', 
  auth.verifyToken, 
  commentBodyRequestVerifications.create,
  auth.checkUserIdInBodyRequest,
  commentDBVerifications.create,
  commentRoutes.create
)

router.get(
  '/read/:commentId', 
  auth.verifyToken, 
  commentBodyRequestVerifications.getById,
  commentDBVerifications.getById,
  commentRoutes.getCommentById
)

router.put(
  '/edit', 
  auth.verifyToken, 
  commentBodyRequestVerifications.edit,
  commentDBVerifications.edit,
  commentRoutes.updateComment
)

router.delete(
  '/:commentId', 
  auth.verifyToken, 
  commentBodyRequestVerifications.delete,
  commentDBVerifications.delete,
  commentRoutes.deleteComment
)

module.exports = router