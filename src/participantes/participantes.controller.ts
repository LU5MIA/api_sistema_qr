import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common';
import { ParticipantesService } from './participantes.service';
import { CreateParticipanteDto } from './dto/create-participante.dto';

@Controller('participantes')
export class ParticipantesController {

    constructor(private readonly participantesService: ParticipantesService) { }

    @Post()
    create(@Body() dto: CreateParticipanteDto) {
        console.log("DATA RECIBIDA DESDE GOOGLE FORMS:", dto);
        return this.participantesService.create(dto);
    }

    @Get()
    findAll() {
        return this.participantesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.participantesService.findOne(id);
    }

    @Get('sesion/:id')
    getParticipantesBySesion(@Param('id') id: number) {
        return this.participantesService.findBySesion(id);
    }
}
