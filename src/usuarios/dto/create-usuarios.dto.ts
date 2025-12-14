import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUsuariosDto {

    @IsNumber()
    id_usuario: number;

    @IsString()
    @IsNotEmpty()
    nombre_usuario: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}