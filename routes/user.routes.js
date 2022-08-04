const router = require('express').Router(),
  userRoutes = require('../controllers/user.controller'),
  auth = require('../middlewares/auth.middleware'),
  adminAuth = require('../middlewares/adminAuth.middleware'),
  csrfTokenMiddleware = require('../middlewares/csrfToken.middleware'),
  userBodyRequestVerifications = require('../middlewares/content-verifications/userRequestVerification.middleware'),
  userDBVerifications = require('../middlewares/database-verifications/userDBVerifications.middleware'),
  rateLimitOptions = require('../utils/rateLimitOptions');


router.get(
  '/get-all-for-research/:userId',
  rateLimitOptions.apiLimiter,
  auth.verifyToken,
  userBodyRequestVerifications.checkUserIdInParams,
  userRoutes.getAllForGeneralResearch
)

// authentication
router.post(
  '/register', 
  rateLimitOptions.registerLimiter,
  userBodyRequestVerifications.userRegister, 
  userDBVerifications.avoidDuplicateNames,
  userDBVerifications.avoidDuplicateEmail,
  userRoutes.register
)

router.post(
  '/login', 
  rateLimitOptions.loginLimiter,
  userBodyRequestVerifications.userLogin, 
  userDBVerifications.retrieveUserByEmail,
  userDBVerifications.comparePassword,
  userRoutes.login
)

// check if token exist
router.get(
  "/checkToken", 
  rateLimitOptions.apiLimiter,
  auth.verifyToken,
  csrfTokenMiddleware.deleteCsrfTokenInResponse, 
  userRoutes.checkToken
)

// get all for filtred search
router.get(
  "/get-all-for-filtered-search", 
  rateLimitOptions.apiLimiter,
  auth.verifyToken, 
  csrfTokenMiddleware.deleteCsrfTokenInResponse,
  userRoutes.getAllForFilteredSearch
)

// edit and delete
router.put(
  '/edit', 
  rateLimitOptions.apiLimiter,
  auth.verifyToken, 
  csrfTokenMiddleware.verifyCsrfToken,
  csrfTokenMiddleware.deleteCsrfTokenInResponse,
  userBodyRequestVerifications.checkEditUserRequest,
  userDBVerifications.retrieveUserById,
  userDBVerifications.verifyIfNewUserNameNotExistInDB,
  userRoutes.editUser
)

router.delete(
  '/:userId', 
  rateLimitOptions.apiLimiter,
  auth.verifyToken, 
  csrfTokenMiddleware.verifyCsrfToken,
  csrfTokenMiddleware.deleteCsrfTokenInResponse,
  adminAuth.verifyAdminRole, 
  userRoutes.deleteUser
)

// find a particular user
router.get(
  "/:name", 
  rateLimitOptions.apiLimiter,
  auth.verifyToken, 
  userBodyRequestVerifications.checkUserNameInParams,
  userDBVerifications.retrieveUserByParamsName,
  userRoutes.getUserByName
)

module.exports = router