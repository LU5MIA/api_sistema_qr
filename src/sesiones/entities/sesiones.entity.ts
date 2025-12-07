import { Participantes } from 'src/participantes/entities/participantes.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sesiones')
export class Sesiones {
    @PrimaryGeneratedColumn()
    id_sesion: number;

    @Column()
    titulo: string;
    
    @Column()
    lugar: string;
    
    @Column({ type: 'datetime' })
    fecha: Date;

    @OneToMany(() => Participantes, participante => participante.sesion)
    participantes: Participantes[];
}
