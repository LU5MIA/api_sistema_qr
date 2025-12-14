import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { UpdateUsuariosDto } from './dto/update-usuarios.dto';

@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(Usuarios)
        private usuariosRepository: Repository<Usuarios>,
    ) { }

    async getAll() {
        return await this.usuariosRepository.find();
    }

    async getById(id: number) {
        const usuario = await this.usuariosRepository.findOneBy({ id_usuario: id });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        return usuario;
    }

    async update(id: number, dto: UpdateUsuariosDto) {
        const data: Partial<Usuarios> = {};

        if (dto.nombre_usuario !== undefined) {
            data.nombre_usuario = dto.nombre_usuario;
        }

        if (dto.password !== undefined) {
            data.password = dto.password;
        }

        const result = await this.usuariosRepository.update(
            { id_usuario: id },
            data
        );

        if (result.affected === 0) {
            throw new Error('Usuario no encontrado');
        }

        return this.getById(id);
    }


}
