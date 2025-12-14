import { IsNotEmpty, IsString } from "class-validator";

export class loginDto {

    @IsNotEmpty()
    @IsString()
    nombre_usuario: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}