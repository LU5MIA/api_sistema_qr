import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';

@Entity('usuarios')
export class Usuarios {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    nombre_usuario: string;

    @Column()
    password: string;

}