import { Response, Request } from "express";
import { UsersService } from "../services/UsersService";

export class UserController {
    private userServ = new UsersService();

    async signup(req: Request, res: Response) {
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const email = req.body.email;
        const password = req.body.password;
        const newUser = await this.userServ.signup(nom, prenom, email, password);

        if (!newUser) {
            res.status(500).send({status: "FAILED", messsage: "Oups !"});
            return;
        }

        res.status(201).send({status: "OK", data: newUser});
    }


    async login(req: Request, res:Response) {
        const email = req.body.email;
        const password = req.body.password;

        const token = await this.userServ.login(email, password);

        if (!token) {
            res.status(500).send({status: "FAILED", messsage: "Problème avec le token !"});
            return;
        }

        res.status(200).send({status: "OK", data: token});
    }
}