import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Plants {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom: string

    @Column()
    soleil: string
    
    @Column()
    arrosage: number

    @Column()
    categorie: string

    @Column()
    image: string

}