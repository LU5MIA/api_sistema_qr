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
        return await this.sesionesRepo.find({
            relations: ['participantes'],
        });
    }

    async findOne(id: number) {
        return await this.sesionesRepo.findOne({
            where: { id_sesion: id },
            relations: ['participantes'],
        });
    }


}
