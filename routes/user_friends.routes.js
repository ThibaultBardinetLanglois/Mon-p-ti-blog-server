const router = require('express').Router(),
  user_friendsRoutes = require('../controllers/user_friends.controller'),
  auth = require('../middlewares/auth.middleware'),
  user_friendsBodyRequestVerifications = require('../middlewares/content-verifications/user_friendsRequestVerification.middleware'),
  user_friendsDBVerifications = require('../middlewares/database-verifications/user_friendsDBVerifications.middleware');


router.get(
  '/get-all-friends-by-user/:userId', 
  auth.verifyToken, 
  user_friendsBodyRequestVerifications.checkUserIdInRequestParams,
  auth.checkUserIdInParamsRequest,
  user_friendsRoutes.getAllFriendsByUser
)

router.get(
  '/get-all-friends-recommandations-by-user', 
  auth.verifyToken, 
  user_friendsBodyRequestVerifications.checkUserIdInRequestParams,
  auth.checkUserIdInParamsRequest,
  user_friendsRoutes.getAllFriendsRecommandationsByUser
)

router.post(
  '/propose-to-be-friend', 
  auth.verifyToken, 
  user_friendsBodyRequestVerifications.proposeToBeFriend,
  auth.checkUserIdInBodyRequest,
  user_friendsDBVerifications.proposeToBeFriend,
  user_friendsRoutes.proposeToBeFriend
)

router.get(
  '/pending-invitations-sent-by-user', 
  auth.verifyToken, 
  user_friendsBodyRequestVerifications.checkUserIdInRequestBody,
  auth.checkUserIdInBodyRequest, 
  user_friendsRoutes.getAllPendingInvitationsSentByUser
)

router.get(
  '/pending-invitations-received-by-user', 
  auth.verifyToken,
  user_friendsBodyRequestVerifications.checkUserIdInRequestBody,
  auth.checkUserIdInBodyRequest,
  user_friendsRoutes.getAllPendingInvitationsReceivedByUser
)

router.put(
  '/validate-to-be-friend', 
  auth.verifyToken, 
  user_friendsBodyRequestVerifications.checkRelationIdInRequest,
  user_friendsDBVerifications.validateTobeFriend,
  user_friendsRoutes.validateToBeFriend
)

router.delete(
  '/delete-friend', 
  auth.verifyToken, 
  user_friendsBodyRequestVerifications.checkRelationIdInRequest,
  user_friendsDBVerifications.deleteFriend,
  user_friendsRoutes.deleteFriend
)

router.get(
  '/are-we-friend', 
  auth.verifyToken, 
  user_friendsBodyRequestVerifications.areWeFriend,
  auth.checkUserIdInBodyRequest,
  user_friendsDBVerifications.areWeFriend,
  user_friendsRoutes.areWeFriend
)

router.get(
  '/get-all-friends-posts/:userId', 
  auth.verifyToken, 
  user_friendsBodyRequestVerifications.checkUserIdInRequestParams,
  auth.checkUserIdInParamsRequest,
  user_friendsRoutes.getAllFriendsPostsByUser
)


module.exports = router