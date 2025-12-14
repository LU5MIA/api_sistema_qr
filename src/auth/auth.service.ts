import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuarios)
        private readonly usuariosRepository: Repository<Usuarios>,
    ) {}

    async login(nombre_usuario: string, password: string) {
        const usuario = await this.usuariosRepository.findOneBy({ nombre_usuario });
        if (!usuario) {
            throw new UnauthorizedException('Usuario o contraseña incorrectos');
        }
        if (usuario.password !== password) {
            throw new UnauthorizedException('Usuario o contraseña incorrectos');
        }
        return usuario;
    }
}
