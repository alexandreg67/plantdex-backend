import { Response, Request } from "express";
import { UsersService } from "../services/UsersService";

export class UserController {
    private userServ = new UsersService();

    async signup(req: Request, res: Response) { // Inscription d'un utilisateur
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const email = req.body.email;
        const password = req.body.password;
        console.log(`Je suis dans signup de user controller et je récupère Nom : ${nom}, Prenom : ${prenom}, Email : ${email}, Password : ${password} `);
        
        const newUser = await this.userServ.signup(nom, prenom, email, password); // Création d'un nouvel utilisateur

        if (!newUser) {
            res.status(500).send({status: "FAILED", messsage: "Oups !"});
            return;
        }

        res.status(201).send({status: "OK", data: newUser}); // Renvoie le nouvel utilisateur
    }


    async login(req: Request, res:Response) { // Connexion d'un utilisateur
        const email = req.body.email; // Je récupère l'email
        const password = req.body.password; // Je récupère le mot de passe

        const token = await this.userServ.login(email, password); // Création du token

        console.log("je suis dans login de user controller et je récupère token : ", token);

        if (!token) {
            res.status(500).send({status: "FAILED", messsage: "Problème avec le token !"});
            return;
        }

        res.status(200).send({status: "OK", data: token}); // Renvoie le token
    }

    async checkToken(req: Request, res:Response) { 
        const token = req.headers['authorization']?.split(' ')[1];
        console.log("je suis dans checkToken de user controller et je récupère token : ", token);
        
        if (!token) {// Si le token est manquant
            console.log("je suis dans checkToken de user controller et le token est manquant");
            return res.status(401).send({ message: 'Token is missing!', isValid: false });  // Non autorisé
        }

        try {
            const isValidToken = await this.userServ.checkToken(token);
            if(isValidToken) {
                return res.json({ message: 'Token is valid!', isValid: true }); // Le token est valide
            }
        } catch (error) {
            if (error === 'Token has expired') { // Si le token a expiré
                console.log("je suis dans le catch checkToken de user controller et le token a expiré");
                return res.status(401).send({ message: 'Token has expired!', isValid: false }); // Non autorisé
            } else {
                console.log("je suis dans le catch checkToken de user controller et le token est invalide");
                return res.status(403).send({ message: 'Token is invalid!', isValid: false }); // Non autorisé
            }
        }

    }

    async getIdUser(req: Request, res:Response) { // Récupère les informations d'un utilisateur
        const token = req.headers['authorization']?.split(' ')[1];
        console.log("je suis dans getIdUser de user controller et je récupère token : ", token);
        
        if (!token) {// Si le token est manquant
            console.log("je suis dans getIdUser de user controller et le token est manquant");
            return res.status(401).send({ message: 'Token is missing!'});  // Non autorisé
        }

        try {
            const idUser = await this.userServ.getIdUser(token);
            if(idUser) {
                return res.json({ id: idUser }); // Renvoie l'id de l'utilisateur
            } else {
                return res.status(403).send({ message: 'Failed to retrieve user ID or Token is invalid!'}); // L'id de l'utilisateur n'a pas été trouvé
            }
        } catch (error) {
            console.error("Error in getIdUser : ", error);
            return res.status(500).send({ message: 'Server error!'});
        }
    }
}