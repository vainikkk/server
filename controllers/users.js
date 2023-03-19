const User = require("../models/User");
const createError = require("../utils/createError");
const { registerValidation } = require("../utils/inputValidation");

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("Successfully deleted");
  } catch (err) {
    next(err);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await User.count();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) return next(createError(400, error.details[0].message));
  const { name, email, phone } = req.body;
  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) return next(createError(400, "User already exists"));
    const newUser = await User.create({
      name: name,
      email: email,
      phone: phone,
    });
    return res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  createUser,
};
