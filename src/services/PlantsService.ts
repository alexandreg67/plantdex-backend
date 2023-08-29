
import AppDataSource from "../data-source";
import { Plants } from "../entities/Plants";

export class PlantsService {
    private plantsRepository = AppDataSource.getRepository(Plants);

    getAll() {
        return this.plantsRepository.find();
    };

    getPlantById(idValue: number) {
        return this.plantsRepository.findOneBy({id: idValue});
    }

    create(newName: string, newSun: string, newArrosage: number, newCat: string, newPicture: string) {
        const newPlant = this.plantsRepository.create({
            nom: newName,
            soleil: newSun,
            arrosage: newArrosage,
            categorie: newCat,
            image: newPicture
        });

        return this.plantsRepository.save(newPlant)
    }
}