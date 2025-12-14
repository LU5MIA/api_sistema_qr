import { Injectable, NotFoundException } from '@nestjs/common';
import { Sesiones } from './entities/sesiones.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createSesionesDto } from './dto/create-sesiones.dto';
import * as QRCode from 'qrcode';
import { UpdateSesionesDto } from './dto/update-sesiones.dto';

@Injectable()
export class SesionesService {
    constructor(
        @InjectRepository(Sesiones)
        private sesionesRepo: Repository<Sesiones>,
    ) { }

    async create(data: createSesionesDto) {
        const nuevaSesion = this.sesionesRepo.create(data);
        const sesionGuardada = await this.sesionesRepo.save(nuevaSesion);

        await this.regenerarQR(sesionGuardada);

        return await this.sesionesRepo.save(sesionGuardada);
    }


    async findAll() {
        const sesiones = await this.sesionesRepo.find({
            relations: ['participantes'],
        });

        return sesiones.map(s => ({
            ...s,
            fecha: this.formatDateTime(s.fecha),
        }));
    }

    private buildFormUrl(sessionId: number, titulo: string): string {
        const base = 'https://docs.google.com/forms/d/e/1FAIpQLSfi3QPIjlN9towBTSq6wZVBV72ctLqgLFHz4gF1V4pzYozaYA/viewform?usp=pp_url';
        const entryId = 'entry.923954382';       
        const entryTitulo = 'entry.1010727002';  
        return `${base}&${entryId}=${encodeURIComponent(sessionId.toString())}&${entryTitulo}=${encodeURIComponent(titulo)}`;
    }


    async generateQRCodeDataUrl(url: string): Promise<string> {
        return await QRCode.toDataURL(url, { width: 300 });
    }

    private async regenerarQR(sesion: Sesiones) {
        const qrUrl = this.buildFormUrl(
            sesion.id_sesion,
            sesion.titulo
        );

        sesion.qrCode = await this.generateQRCodeDataUrl(qrUrl);
    }


    async findOne(id: number) {
        const sesion = await this.sesionesRepo.findOne({
            where: { id_sesion: id },
            relations: ['participantes'],
        });

        if (!sesion) return null;

        return {
            ...sesion,
            fecha: this.formatDateTime(sesion.fecha),
            qrCode: sesion.qrCode 
        };
    }

    async update(id: number, data: UpdateSesionesDto) {
        const sesion = await this.sesionesRepo.findOne({
            where: { id_sesion: id },
        });

        if (!sesion) {
            throw new NotFoundException('Sesión no encontrada');
        }

        const cambiaTitulo =
            data.titulo && data.titulo !== sesion.titulo;

        Object.assign(sesion, data);

        if (cambiaTitulo) {
            await this.regenerarQR(sesion);
        }

        return await this.sesionesRepo.save(sesion);
    }


    async remove(id: number) {
        const sesion = await this.sesionesRepo.findOne({
            where: { id_sesion: id },
        });

        if (!sesion) {
            throw new NotFoundException('Sesión no encontrada');
        }

        await this.sesionesRepo.remove(sesion);
        return { message: 'Sesión eliminada correctamente' };
    }

    formatDateTime(date: Date): string {
        const d = new Date(date);

        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }



}
