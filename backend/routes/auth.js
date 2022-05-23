const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/auth');

router.post(
    '/signup',
    [
        body('name').trim().not().isEmpty(),
        body('email')
        .isEmail()
        .withMessage('Kérlek érvényes email címet adj meg')
        .custom(async (email) => {
          const user = await User.selectByEmail(email);
          if (user[0].length > 0) {
            return Promise.reject('Az email cím már létezik');
          }
        })
        .normalizeEmail(),
        body('password').trim().isLength({ min: 7 }),
    ], authController.signup
);

router.post('/login', authController.login);

module.exports = router;