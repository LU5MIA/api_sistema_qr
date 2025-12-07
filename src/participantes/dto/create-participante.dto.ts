import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateParticipanteDto {
    @IsNumber()
    id_sesion: number;

    @IsString()
    @IsNotEmpty()
    correo: string;

    @IsString()
    @IsNotEmpty()
    nombres_apellidos: string;

    @IsNumber()
    dni: number;

    @IsString()
    @IsNotEmpty()
    direccion: string;
    
    @IsDate()
    fecha: Date;
}
