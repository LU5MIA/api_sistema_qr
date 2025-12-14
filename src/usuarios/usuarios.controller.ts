import { Controller } from '@nestjs/common';
import { Get, Param, Put, Body, NotFoundException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './entities/usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Get()
    async getAll(){
        return await this.usuariosService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string){
        const usuario = await this.usuariosService.getById(Number(id));
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return usuario;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Partial<Usuarios>,) {
        const usuario = await this.usuariosService.update(Number(id), data);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return usuario;
    }
}
