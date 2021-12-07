import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { validationResult } from 'express-validator';

const signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: errors.array()[0].msg,
      field: errors.array()[0].param,
    });
  }
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: 'This user doesnot exists' });
    }
    if (!user.authenticate(password)) {
      return res
        .status(401)
        .send({ success: false, msg: "Email and password don't match." });
    }
    const token = jwt.sign({ _id: user._id }, 'secajkshdsaret');
    res.cookie('token', token, { expire: new Date() + 9999 });
    return res.json({
      success: true,
      msg: 'Signin successfull',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status('401').json({ success: false, msg: err.message });
  }
};
const signout = (req, res) => {
  res.clearCookie('token');
  return res.status('200').json({
    message: 'signed out',
  });
};

const requireSignin = expressJwt({
  secret: 'secajkshdsaret',
  algorithms: ['HS256'],
  userProperty: 'auth',
});
const hasAuthorization = (req, res, next) => {
  console.log('AUTHHHHHHHHHHHHH');
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status('403').json({
      error: 'User is not authorized',
    });
  }
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
