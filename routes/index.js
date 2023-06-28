const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController');
const jwtAuth = require('../middleware/jwtAuth');

router.get('/', function (req, res) {
    return res.json({ message: "Hello" })
});

router.post('/signin', userController.signin);
router.post('/signup', userController.signup);

router.post('/signiin', jwtAuth.validate, userController.signiin);

module.exports = router;