import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createSesionesDto {
    @IsNumber()
    id_sesion: number;

    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    lugar: string;

    @IsDate()
    fecha: Date;
}