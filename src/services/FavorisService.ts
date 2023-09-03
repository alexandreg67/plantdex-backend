import AppDataSource from "../data-source";
import { Favoris } from "../entities/favoris";

export class FavorisService {
    
    private favorisRepository = AppDataSource.getRepository(Favoris); // Récupère le repository de la table Users
    
    
    async addFavoris(idUser: number, idPlant: number) { // Ajoute un favoris
        console.log(`Je suis dans addFavoris de favoris service et je récupère idUser : ${idUser}, idPlant : ${idPlant}`);
        try {
            const newFavoris = this.favorisRepository.create({ // Création d'un nouveau favoris
                userId: idUser,
                plantId: idPlant
            })
            console.log("je suis dans le try du addFavoris : ");
            const createdFavoris = await this.favorisRepository.save(newFavoris); // Sauvegarde du nouvel utilisateur dans la base de données
            return createdFavoris;
            
        } catch (error) { // Si une erreur survient
            console.log("je suis dans le catch du addFavoris : ", error);
            return null;
        }
    
    }
    
    
    async deleteFavoris(idUser: number, idPlant: number) { // Supprime un favoris
        console.log(`Je suis dans deleteFavoris de favoris service et je récupère idUser : ${idUser}, idPlant : ${idPlant}`);
        try {
            const favoris = await this.favorisRepository.findOneBy({userId: idUser, plantId: idPlant}) // Recherche du favoris dans la base de données
            console.log("je suis dans le try du deleteFavoris : ");
            const deletedFavoris = await this.favorisRepository.remove(favoris); // Suppression du favoris dans la base de données
            return deletedFavoris;
            
        } catch (error) { // Si une erreur survient
            console.log("je suis dans le catch du deleteFavoris : ", error);
            return null;
        }
    
    }
    
    
    async getFavoris(idUser: number) {
    console.log(`Je suis dans getFavoris de favoris service et je récupère idUser : ${idUser}`);
        try {
            const favoris = await this.favorisRepository.find({where: {userId: idUser}}); // Recherche des favoris dans la base de données
            console.log("je suis dans le try du getFavoris : ");
            return favoris.map(fav => fav.plantId);  // retourner seulement les IDs des plantes
                
        } catch (error) { // Si une erreur survient
            console.log("je suis dans le catch du getFavoris : ", error);
            return null;
        }
    }
}