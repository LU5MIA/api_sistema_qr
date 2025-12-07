import { Module } from '@nestjs/common';
import { ParticipantesService } from './participantes.service';
import { ParticipantesController } from './participantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participantes } from './entities/participantes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participantes])],
  providers: [ParticipantesService],
  controllers: [ParticipantesController]
})
export class ParticipantesModule {}
