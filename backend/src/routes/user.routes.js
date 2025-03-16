const express = require('express')
const router = express.Router();
const { registerUserHandler, loginUserHandler } = require('../controllers/user.controller')
const validateToken = require('../middlewares/auth.middleware');

router.post('/register', registerUserHandler)
router.post('/login', loginUserHandler)

// secured routes
router.get('/', validateToken, (req, res) => {
    return res.send('Hello world');
})

module.exports = router