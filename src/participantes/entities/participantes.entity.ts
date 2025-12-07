import { Sesiones } from 'src/sesiones/entities/sesiones.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity('participantes')

export class Participantes {
  @PrimaryGeneratedColumn()
  id_participante: number;

  @Column()
  id_sesion: number;
  
  @Column()
  correo: string;
  
  @Column()
  nombres_apellidos: string;
  
  @Column()
  dni: number;
  
  @Column()
  direccion: string;
  
  @Column({ type: 'date' })
  fecha: Date;

  @ManyToOne(() => Sesiones, sesion => sesion.participantes)
  sesion: Sesiones;
}
