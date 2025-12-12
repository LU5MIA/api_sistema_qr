import { Injectable } from '@nestjs/common';
import { Sesiones } from './entities/sesiones.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createSesionesDto } from './dto/create-sesiones.dto';

@Injectable()
export class SesionesService {
    constructor(
        @InjectRepository(Sesiones)
        private sesionesRepo: Repository<Sesiones>,
    ) { }

    async create(data: createSesionesDto) {
        const nueva = this.sesionesRepo.create(data);
        return await this.sesionesRepo.save(nueva);
    }

    async findAll() {
        const sesiones = await this.sesionesRepo.find({
            relations: ['participantes'],
        });

        return sesiones.map(s => ({
            ...s,
            fecha: this.formatDateTime(s.fecha),
        }));
    }

    async findOne(id: number) {
        const sesion = await this.sesionesRepo.findOne({
            where: { id_sesion: id },
            relations: ['participantes'],
        });

        if (!sesion) return null;

        return {
            ...sesion,
            fecha: this.formatDateTime(sesion.fecha),
        };
    }

    formatDateTime(date: Date): string {
        const d = new Date(date);

        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }



}
