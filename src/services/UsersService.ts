import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import AppDataSource from "../data-source";
import { Users } from "../entities/Users";

export class UsersService {
    private usersRepository = AppDataSource.getRepository(Users); // Récupère le repository de la table Users


    async signup(name: string, firstname: string, email: string, password: string) { // Inscription d'un utilisateur
        const rounds = 10; // nombre de tour de hashage
        console.log(`Je suis dans signup de user service et je récupère Nom : ${name}, Prenom : ${firstname}, Email : ${email}, Password : ${password} `);

        try {
            const hash = await bcrypt.hash(password, rounds); // hashage du mot de passe
            const newUser = this.usersRepository.create({ // Création d'un nouvel utilisateur
                nom: name,
                prenom: firstname,
                email: email,
                password: hash
            })
            console.log("je suis dans le try du signup : ");
            const createdUser = await this.usersRepository.save(newUser); // Sauvegarde du nouvel utilisateur dans la base de données
            return createdUser;
            
        } catch (error) { // Si une erreur survient
            console.log("je suis dans le catch du signup : ", error);
            return null;
        }

    }


    async login(email: string, password: string) { // Connexion d'un utilisateur
        const found = await this.usersRepository.findOneBy({email: email}) // Recherche de l'utilisateur dans la base de données
        console.log("je suis dans user service et je récupère found : ", found);
        
        if (!found) { // Si l'utilisateur n'est pas trouvé
            return null;
        }
        const passwordMatched = await bcrypt.compare(password, found.password); // Comparaison du mot de passe entré avec le mot de passe hashé
        if (!passwordMatched) { // Si les mots de passe ne correspondent pas
            return null;
        }       

        const token = jwt.sign({ sub: found.id, email: found.email }, process.env.PRIVATEKEY_TOKEN, { expiresIn: "1h" }); // Création du token

        return token // Renvoie le token

    }

    async checkToken(token: string) { // Vérifie la validité du token
        console.log("je suis dans checkToken : ", token);
        
        return new Promise((resolve, reject) => { // Crée une promesse
            try {
                jwt.verify(token, process.env.PRIVATEKEY_TOKEN); // Vérifie le token
                console.log("je suis dans le try du checkToken : et le token est valide");
                resolve(true);  // Le token est valide
            } catch (error) {
                if (error instanceof jwt.TokenExpiredError) {// Si le token a expiré
                    reject('Token has expired');  // Le token a expiré
                } else {
                    reject('Token is invalid');  // Le token est invalide pour une autre raison
                }
            }
        });
    }    

    async getIdUser(token: string) { // Récupère les informations d'un utilisateur
        try {
            const decodedToken = jwt.verify(token, process.env.PRIVATEKEY_TOKEN); // Vérifie le token
            console.log("je suis dans le try du getIdUser : ", decodedToken);
            
            if (decodedToken && decodedToken.sub) {
                return decodedToken.sub; // Renvoie l'id de l'utilisateur
            } else {
                return null; 
            }
        } catch (error) {
            console.error("Erreur dans le getIdUser : ", error)
            return null;
        }
    }

}