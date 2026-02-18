"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const enum_entity_1 = require("./entities/enum.entity");
const slot_entity_1 = require("../slots/entities/slot.entity");
const appointment_time_service_1 = require("./appointment.time.service");
const moment = require("moment-timezone");
const mail_service_1 = require("../mail/mail.service");
const patient_entity_1 = require("../patients/entities/patient.entity");
let AppointmentsService = class AppointmentsService {
    appointmentRepo;
    slotRepo;
    patientRepo;
    appointmentTimeService;
    mailService;
    constructor(appointmentRepo, slotRepo, patientRepo, appointmentTimeService, mailService) {
        this.appointmentRepo = appointmentRepo;
        this.slotRepo = slotRepo;
        this.patientRepo = patientRepo;
        this.appointmentTimeService = appointmentTimeService;
        this.mailService = mailService;
    }
    async bookAppointment(dto) {
        const slot = await this.slotRepo.findOne({
            where: { id: dto.slotId },
            relations: ['doctor'],
        });
        if (!slot)
            throw new common_1.NotFoundException('Slot not found');
        const isEmergency = dto.isEmergency ?? false;
        const existingAppointments = await this.appointmentRepo.count({
            where: { slotId: slot.id },
        });
        if (existingAppointments >= slot.maxBookingsPerSlot) {
            throw new common_1.BadRequestException(`Slot already full. Max bookings allowed: ${slot.maxBookingsPerSlot}`);
        }
        let parsedDate;
        if (moment(slot.date, 'YYYY-MM-DD', true).isValid()) {
            parsedDate = moment(slot.date, 'YYYY-MM-DD');
        }
        else if (moment(slot.date, 'DD-MM-YYYY', true).isValid()) {
            parsedDate = moment(slot.date, 'DD-MM-YYYY');
        }
        else {
            throw new common_1.BadRequestException('Invalid slot date format');
        }
        const today = moment().tz('Asia/Kolkata').startOf('day');
        const slotDate = parsedDate.clone().startOf('day');
        if (slotDate.isBefore(today)) {
            throw new common_1.BadRequestException('Cannot book appointment for a past date');
        }
        if (dto.appointmentTime) {
            await this.appointmentTimeService.validateAppointmentTime(slot, dto.appointmentTime, isEmergency);
        }
        const expiresAt = parsedDate
            .tz('Asia/Kolkata')
            .hour(9)
            .minute(0)
            .second(0)
            .toDate();
        const appointment = this.appointmentRepo.create({
            patientId: dto.patientId,
            slotId: dto.slotId,
            appointmentTime: dto.appointmentTime,
            isEmergency,
            date: dto.date,
            status: enum_entity_1.AppointmentStatus.BOOKED,
            expiresAt,
        });
        const savedAppointment = await this.appointmentRepo.save(appointment);
        const patient = await this.patientRepo.findOne({
            where: { id: dto.patientId },
        });
        if (patient?.email && patient?.name) {
            await this.mailService.sendAppointmentBookedEmail(patient.email, patient.name, slot.doctor?.name, slot.date, `${slot.startTime} - ${slot.endTime}`);
        }
        return savedAppointment;
    }
    async cancelAppointment(id) {
        const appointment = await this.appointmentRepo.findOne({ where: { id } });
        if (!appointment)
            throw new common_1.NotFoundException('Appointment not found');
        appointment.status = enum_entity_1.AppointmentStatus.CANCELLED;
        return this.appointmentRepo.save(appointment);
    }
    async markAsAttended(id) {
        const appointment = await this.appointmentRepo.findOne({ where: { id } });
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        appointment.status = enum_entity_1.AppointmentStatus.ATTENDED;
        appointment.attendedAt = new Date();
        return this.appointmentRepo.save(appointment);
    }
    async getPatientAppointments(patientId) {
        try {
            return await this.appointmentRepo.find({
                where: { patient: { id: patientId } },
                relations: ['slot', 'patient'],
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error instanceof Error ? error.message : 'Failed to fetch appointments');
        }
    }
    async getAllAppointments() {
        try {
            return await this.appointmentRepo.find({
                relations: ['slot', 'patient'],
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error instanceof Error
                ? error.message
                : 'Failed to fetch all appointments');
        }
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(slot_entity_1.Slot)),
    __param(2, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        appointment_time_service_1.AppointmentTimeService,
        mail_service_1.MailService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map