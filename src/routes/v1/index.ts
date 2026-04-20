import express from 'express';

import authRouter from './auth.route';
import pingRouter from './ping.route';
import userRouter from './user.route';

const v1Router = express.Router();

v1Router.use('/ping', pingRouter);

v1Router.use('/auth', authRouter);

v1Router.use('/users', userRouter);

export default v1Router;