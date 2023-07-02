const express = require('express')
const router = express.Router();

const { pageController, userController } = require('../controller');

router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.get('/posts', pageController.pageWise);
router.get('/', function (req, res) {
    res.send({
        message: 'Hello'
    })
})

module.exports = router;