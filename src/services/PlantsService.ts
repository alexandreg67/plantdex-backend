
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

    create(newName: string, newSun: string, newArrosage: number, newPicture: string, newCat: string) {
        const newPlant = this.plantsRepository.create({
            nom: newName,
            soleil: newSun,
            arrosage: newArrosage,
            image: newPicture,
            categorie: newCat
        });

        return this.plantsRepository.save(newPlant)
    }

    async update(id:number, attributs:Partial<Plants>) {
        const plantToUpdate = await this.getPlantById(id);
        if (!plantToUpdate) {
            return null;
        }
        Object.assign(plantToUpdate, attributs);
        return this.plantsRepository.save(plantToUpdate);
    }

    async remove(id:number) {
        const plantToDelete = await this.getPlantById(id);
        if (!plantToDelete) {
            return null;
        }
        return this.plantsRepository.remove(plantToDelete);
    }
}