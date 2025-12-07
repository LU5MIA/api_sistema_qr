import { Injectable } from '@nestjs/common';
import { Participantes } from './entities/participantes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipanteDto } from './dto/create-participante.dto';

@Injectable()
export class ParticipantesService {

    constructor(
        @InjectRepository(Participantes)
        private participantesRepo: Repository<Participantes>,
    ) { }
 
    async create(data: CreateParticipanteDto) {
        const nuevo = this.participantesRepo.create(data);
        return await this.participantesRepo.save(nuevo);
    }

    async findAll() {
        return await this.participantesRepo.find({
            relations: ['sesion'],
        });
    }

    async findOne(id: number) {
        return await this.participantesRepo.findOne({
            where: { id_participante: id },
            relations: ['sesion'],
        });
    }

}
