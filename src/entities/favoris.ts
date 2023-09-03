import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("favoris")
export class Favoris {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "user_id" })
    userId: number;

    @Column({ name: "plant_id" })
    plantId: number;
}