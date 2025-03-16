const express = require('express');
const router = express.Router();
const {
    registerUserHandler,
    loginUserHandler,
    logOutUserHandler,
    refreshAccessToken,
} = require('../controllers/user.controller');
const validateToken = require('../middlewares/auth.middleware');

router.post('/register', registerUserHandler);
router.post('/login', loginUserHandler);

// secured routes
router.get('/', validateToken, (req, res) => {
    return res.send('Hello world');
});

router.post('/logout', validateToken, logOutUserHandler);
router.post('/refresh-token', refreshAccessToken);

module.exports = router;
