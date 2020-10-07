import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {MinLength, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';


@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(8)
    @IsEmail()
    @IsNotEmpty()
    username: string;

    @Column()
    @MinLength(5)
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    telefono: number;

    @Column()
    @MinLength(5)
    @IsNotEmpty()
    nombres: string;

    @Column()
    @MinLength(5)
    @IsNotEmpty()
    apellidos: string;

    @Column()
    @IsNotEmpty()
    direccion: string;

    @Column()
    @IsNotEmpty()
    ciudad: string;

    @Column()
    @CreateDateColumn()
    fech_user_creado: Date;

    @Column()
    @UpdateDateColumn()
    fech_user_modificado: Date;

    //encriptacion de contraseñas 
    hashPassword():void {
      const salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync( this.password, salt);
    }

    checkPassword(password:string): boolean{
        return bcrypt.compareSync(password, this.password);
    }

}
