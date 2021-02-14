import express from 'express';
import { celebrate, Joi } from 'celebrate';

import UsersController from './controllers/UsersController';
import AuthController from './controllers/AuthController';
import { verifyJWT } from './helpers/JwtAuth';

const Routes = express.Router();

const usersController = new UsersController();
const authController = new AuthController();

// index = more than one, show = one, create, update, delete

Routes.post('/login', authController.Login);
Routes.post('/logout', authController.Logout);

Routes.get('/users', verifyJWT, usersController.Index);
Routes.get('/users/:id', verifyJWT, usersController.Show);
Routes.post('/users',  [verifyJWT, 
    celebrate({
        body: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
            name: Joi.string().required()
        })
    }, {
        abortEarly: false
    })],
    usersController.Create);
Routes.put('/users/:id', verifyJWT, usersController.Update)
Routes.delete('/users/:id', verifyJWT, usersController.Delete)

export default Routes;
