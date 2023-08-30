import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UsersControllers";


const userRouter = Router();
const userController = new UserController();

userRouter.post('/', (req: Request, res: Response) => {
    userController.signup(req, res);
});



userRouter.post('/login', (req: Request, res: Response) => {
    userController.login(req, res)
});

export default userRouter