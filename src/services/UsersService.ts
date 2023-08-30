import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import AppDataSource from "../data-source";
import { Users } from "../entities/Users";

export class UsersService {
    private usersRepository = AppDataSource.getRepository(Users);


    async signup(name: string, firstname: string, email: string, password: string) {
        const rounds = 10; // nombre de tour de hashage
        console.log(`Nom : ${name}, Prenom : ${firstname}, Email : ${email}, Password : ${password} `);

        try {
            const hash = await bcrypt.hash(password, rounds);
            const newUser = this.usersRepository.create({
                nom: name,
                prenom: firstname,
                email: email,
                password: hash
            })
            console.log("je suis dans le try : ");
            const createdUser = await this.usersRepository.save(newUser);
            return createdUser;
            
        } catch (error) {
            console.log("je suis dans le catch : ", error);
            return null;
        }

    }


    async login(email: string, password: string) {
        const found = await this.usersRepository.findOneBy({email: email})
        if (!found) {
            return null;
        }
        const passwordMatched = await bcrypt.compare(password, found.password);
        if (!passwordMatched) {
            return null;
        }       

        const token = jwt.sign({ sub: found.id, email: found.email, expiresIn: "1h" }, process.env.PRIVATEKEY_TOKEN);

        return token

    }
    
}