const Router = require('../../services/router');
const controller = require('./user-controller');

const userRouter = new Router();

userRouter.get('/users', controller.getUsers);
userRouter.post('/users', controller.createUser);

module.exports = userRouter;
