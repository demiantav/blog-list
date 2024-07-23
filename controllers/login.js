import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import User from '../models/user.js';

const loginRouter = Router();

loginRouter.post('/', async (request, response, next) => {
  const { userName, password } = request.body;

  const userToLogin = await User.findOne({ userName });

  const passwordValidation =
    userToLogin === null ? false : await bcrypt.compare(password, userToLogin.hashPassword);

  if (!(userToLogin && passwordValidation)) {
    return response.status(401).json({ error: 'Invalid user or password' });
  }

  const userToToken = {
    userName: userToLogin.userName,
    id: userToLogin._id,
  };

  const token = jwt.sign(userToToken, process.env.SECRET);

  response.status(200).send({ token, user: userToLogin.userName, name: userToLogin.name });
});

export default loginRouter;
