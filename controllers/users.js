import Router from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const userRouter = Router();

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({});
    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', async (request, response, next) => {
  const { userName, name, password } = request.body;

  try {
    const saltRound = 10;

    const hashPassword = await bcrypt.hash(password, saltRound);

    const userToPost = new User({
      userName,
      name,
      hashPassword,
    });

    const newUser = await userToPost.save();

    response.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      response.status(400).json({ error: 'UserName already exists' });
    }

    next(error);
  }
});

export default userRouter;
