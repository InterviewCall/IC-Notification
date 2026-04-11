import express from 'express';

import authRouter from './auth.route';
import pingRouter from './ping.route';

const v1Router = express.Router();

v1Router.use('/ping', pingRouter);

v1Router.use('/auth', authRouter);

export default v1Router;