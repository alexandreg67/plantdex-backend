import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UsersControllers";


const userRouter = Router(); // Création du routeur
const userController = new UserController(); // Création du controller

userRouter.post('/signup', (req: Request, res: Response) => { // Création d'un nouvel utilisateur
    userController.signup(req, res); // Appel de la méthode signup du controller
});



userRouter.post('/login', (req: Request, res: Response) => { // Connexion d'un utilisateur
    userController.login(req, res) // Appel de la méthode login du controller
});

userRouter.post('/checktoken', (req: Request, res: Response) => { // Vérifie la validité du token
    userController.checkToken(req, res) // Appel de la méthode checkToken du controller
});

export default userRouter