import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
