import { FavorisService } from "../services/FavorisService";
import { Request, Response } from "express";

export class FavorisController {
    
    private favorisServ = new FavorisService();

   async addFavoris(req: Request, res: Response) { // Ajoute un favoris
        const idUser = Number(req.body.userId);
        const idPlant = Number(req.body.plantId);

        const newFavoris = await this.favorisServ.addFavoris(idUser, idPlant); // Création d'un nouveau favoris

        if (!newFavoris) {
            res.status(500).send({status: "FAILED", messsage: "Oups !"}); // Si une erreur survient
            return;
        } else {
            res.status(201).send({status: "OK", data: newFavoris}); // Renvoie le nouveau favoris
        }
   }

   async getFavoritesForUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId); // Supposons que l'ID de l'utilisateur soit passé en tant que paramètre de l'URL

        if (!userId) {
            return res.status(400).send({ message: 'UserId is required' });
        }

        try {
            const favoritePlantIds = await this.favorisServ.getFavoris(userId);
            if (favoritePlantIds) {
                return res.status(200).json(favoritePlantIds);
            } else {
                return res.status(404).send({ message: 'Favorites not found for the given user' });
            }
        } catch (error) {
            console.log("Error in getFavoritesForUser: ", error);
            return res.status(500).send({ message: 'Internal server error' });
        }
    }
    
    async deleteFavoris(req: Request, res: Response) { // Supprime un favoris
        const idUser = Number(req.params.userId);
        const idPlant = Number(req.params.plantId);

        const deletedFavoris = await this.favorisServ.deleteFavoris(idUser, idPlant); // Suppression du favoris dans la base de données

        if (!deletedFavoris) {
            res.status(500).send({status: "FAILED", messsage: "Oups !"}); // Si une erreur survient
            return;
        } else {
            res.status(200).send({status: "OK", data: deletedFavoris}); // Renvoie le favoris supprimé
        }
    }
}



