import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUsuariosDto {
    
    @IsString()
    @IsNotEmpty()
    nombre_usuario: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}