import { PartialType } from '@nestjs/mapped-types';
import { createSesionesDto } from './create-sesiones.dto';

export class UpdateSesionesDto extends PartialType(createSesionesDto) {}