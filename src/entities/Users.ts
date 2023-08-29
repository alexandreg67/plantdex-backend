import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Users {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom: string 

    @Column()
    prenom: string
    
    @Column()
    email: string

    @Column()
    password: string

}