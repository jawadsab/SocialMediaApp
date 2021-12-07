import express from 'express';
import { check } from 'express-validator';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router
  .route('/auth/signin')
  .post(
    [
      check('email', 'email is required').not().isEmpty(),
      check('email', 'Please include a valid email address').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),
    ],
    authCtrl.signin
  );
router.route('/auth/signout').get(authCtrl.signout);

export default router;
