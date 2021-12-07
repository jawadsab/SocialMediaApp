import User from '../models/user.model.js';
import extend from 'lodash/extend.js';
import { validationResult } from 'express-validator';
import errorHandler from '../helpers/dbErrorHandler.js';

const create = async (req, res, next) => {
  console.log('Creating User');
  const user = new User(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, msg: errors.array()[0].msg,field: errors.array()[0].param });
  }

  try {
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: 'The email you are trying to signup with already exists',
      });
    }
    await user.save();
    console.log('Saved user');
    return res.status(200).json({
      success: true,
      msg: 'Successfully signed up',
    });
  } catch (err) {
    console.log('Errorrr');
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};
const list = async (req, res) => {
  console.log('Listing users...');
  try {
    let users = await User.find().select('name email updated created');
    res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status('400').json({
        error: 'User not found',
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve user',
    });
  }
};
const read = (req, res) => {
  console.log("reading")
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
const update = async (req, res, next) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const remove = async (req, res, next) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, userByID, read, list, remove, update };
