import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuariosDto } from './create-usuarios.dto';

export class UpdateUsuariosDto extends PartialType(CreateUsuariosDto) {}