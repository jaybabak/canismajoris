const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const findMatch = require('./authenticated/findMatch');
const updateUserWithEmail = require('./authenticated/updateUserWithEmail');

// middleware that is specific to this router
router.use(authMiddleware);

/* Authenticated Routes
*  - all routes for users that have already been authenticated (token)
*/
router.get('/find-match', findMatch);

router.post('/update', updateUserWithEmail);



module.exports = router