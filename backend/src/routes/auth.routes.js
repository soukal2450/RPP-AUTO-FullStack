const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { body } = require('express-validator');

// Signup
router.post('/signup',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('name').notEmpty(),
    body('phone').optional()
  ],
  authController.signup
);

// Login
router.post('/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  authController.login
);

// Verify OTP
router.post('/verify-otp',
  [
    body('email').isEmail(),
    body('otp').isLength({ min: 6, max: 6 })
  ],
  authController.verifyOTP
);

// Forgot Password
router.post('/forgot-password',
  [body('email').isEmail()],
  authController.forgotPassword
);

// Reset Password
router.post('/reset-password',
  [
    body('token').notEmpty(),
    body('newPassword').isLength({ min: 8 })
  ],
  authController.resetPassword
);

module.exports = router;
