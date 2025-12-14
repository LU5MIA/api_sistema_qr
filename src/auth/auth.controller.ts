import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login-dto';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('auth/login')
    async login(@Body() dto: loginDto) {
        try {
            return await this.authService.login(dto.nombre_usuario, dto.password);
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
