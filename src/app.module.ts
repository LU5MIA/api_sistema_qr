import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantesModule } from './participantes/participantes.module';
import { SesionesModule } from './sesiones/sesiones.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', 
      database: 'sistema_qr',
      synchronize: false, 
    }),
    ParticipantesModule,
    SesionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
