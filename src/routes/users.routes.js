import { Router } from 'express';
import userController from '../controllers/users.controller.js';
import validate from '../validators/validate.js';
import { createUserSchema } from '../validators/user.validate.js';
import { authenticateToken } from '../middlewares/authenticate.js';
const router = Router();

//Routes
router
.route('/')
.get(userController.getUsers)
.post(validate(createUserSchema, 'body'), userController.createUser);
//router.get('/', userController.getUsers)
//router.post('/',userController.createUser)
//router.get('/', (req, res) => {
//    res.json({
//        message: 'Welcome to the users API',
//    });
//})
router
    .route('/:id')
    .get(authenticateToken, userController.getUser)
    .put(authenticateToken, userController.updateUser)
    .delete(authenticateToken, userController.deleteUser)
    .patch(authenticateToken, userController.activateInactive);

router.get('/:id/tasks', authenticateToken, userController.getTasks);
export default router;

