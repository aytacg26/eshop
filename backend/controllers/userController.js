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

export { authUser };
