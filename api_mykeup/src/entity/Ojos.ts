import {Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import {MinLength, IsNotEmpty } from 'class-validator';


@Entity()
@Unique(['id'])
export class Ojos {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    nombre: string;

    @Column()
    @IsNotEmpty()
    cantidad: number;

    @Column()
    @IsNotEmpty()
    categoria: string;

    @Column()
    @IsNotEmpty()
    preciobase: number;

    @Column()
    @IsNotEmpty()
    precioventa: number;

    @Column()
    @IsNotEmpty()
    imagen: string;

    @Column()
    @IsNotEmpty()
    descripcion: string;

}
