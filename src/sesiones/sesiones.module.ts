import { Module } from '@nestjs/common';
import { SesionesService } from './sesiones.service';
import { SesionesController } from './sesiones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sesiones } from './entities/sesiones.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Sesiones]) ],
  providers: [SesionesService],
  controllers: [SesionesController]
})
export class SesionesModule {}
