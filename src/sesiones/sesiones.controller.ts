import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common';
import { SesionesService } from './sesiones.service';
import { createSesionesDto } from './dto/create-sesiones.dto';

@Controller('sesiones')
export class SesionesController {

    constructor(private readonly sesionesService: SesionesService) { }

    @Post()
    create(@Body() dto: createSesionesDto) {
        return this.sesionesService.create(dto);
    }

    @Get()
    findAll() {
        return this.sesionesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.sesionesService.findOne(id);
    }

}
