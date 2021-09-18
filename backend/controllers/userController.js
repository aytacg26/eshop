import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//@desc   : Auth user & get a token
//@route  : POST /api/users/login
//@access : Public Route
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isValidPassword = user && (await user.matchPassword(password)); //method added to User Model to compare passwords.

  if (user && isValidPassword) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('invalid email or password.');
  }
});

//@desc   : Register a new user
//@route  : POST /api/users
//@access : Public Route
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already exists.');
  }

  //For more expanded version: TODO:
  //Check if they are exists
  //Check if they are valid (check if the email is a valid email, check if the password is a valid password according to the rules!!)
  //because of required fields in model, this if check is not required but, we need to validate each field (especially email and password)
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('name, email and password is required!');
  }

  //password will be encrypted with the help of mongoose userSchema.pre("save", async fn()) method in userModel
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('invalid user data');
  }
});

//@desc   : GET user profile
//@route  : GET /api/users/profile
//@access : Private Route
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user) {
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    res.json(userData);
  } else {
    res.status(404);
  }
});

export { authUser, registerUser, getUserProfile };
