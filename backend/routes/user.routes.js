import express from 'express';
import { check } from 'express-validator';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router
  .route('/api/users')
  .get(userCtrl.list)
  .post(
    [
      check('name', 'name is required').not().isEmpty(),
      check('email', 'email is required').not().isEmpty(),
      check('email', 'Please include a valid email address').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),
    ],
    userCtrl.create
  );

router
  .route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.param('userId', userCtrl.userByID);

export default router;
