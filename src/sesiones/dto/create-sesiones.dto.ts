import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createSesionesDto {

    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    lugar: string;

    @IsDate()
    fecha: Date;
}