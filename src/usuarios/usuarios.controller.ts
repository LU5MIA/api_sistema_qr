import { Controller, ParseIntPipe } from '@nestjs/common';
import { Get, Param, Put, Body, NotFoundException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdateUsuariosDto } from './dto/update-usuarios.dto';


@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Get()
    async getAll() {
        return this.usuariosService.getAll();
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        const usuario = await this.usuariosService.getById(id);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return usuario;
    }
    
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateUsuariosDto) {
        const usuario = await this.usuariosService.update(Number(id), data);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return usuario;
    }
}
