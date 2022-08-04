const router = require('express').Router(),
auth = require('../middlewares/auth.middleware'),
  csrfTokenRoutes = require('../controllers/csrfToken.controlller'),
  csrfTokenMiddleware = require('../middlewares/csrfToken.middleware');
  

router.get(
  '/get-new-csrf-token', 
  auth.verifyToken,
  csrfTokenMiddleware.getNewCsrfToken,
  csrfTokenRoutes.getNewCsrfToken
)


module.exports = router