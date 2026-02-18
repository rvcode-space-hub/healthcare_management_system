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
exports.AppointmentTimeService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment-timezone");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const enum_entity_1 = require("./entities/enum.entity");
const schedule_1 = require("@nestjs/schedule");
let AppointmentTimeService = class AppointmentTimeService {
    appointmentRepo;
    constructor(appointmentRepo) {
        this.appointmentRepo = appointmentRepo;
    }
    async validateAppointmentTime(slot, appointmentTime, isEmergency) {
        const appointmentMoment = moment.tz(`${slot.date} ${appointmentTime}`, [
            'YYYY-MM-DD HH:mm',
            'DD-MM-YYYY HH:mm',
            'YYYY-MM-DD hh:mma',
            'DD-MM-YYYY hh:mma',
        ], true, 'Asia/Kolkata');
        if (!appointmentMoment.isValid()) {
            throw new common_1.BadRequestException('Invalid appointment time format');
        }
        const appointmentEndMoment = appointmentMoment.clone().add(30, 'minutes');
        const day = appointmentMoment.format('dddd');
        const isWeekend = ['Saturday', 'Sunday'].includes(day);
        if (isWeekend && !isEmergency) {
            throw new common_1.BadRequestException('Only emergency appointments are allowed on weekends');
        }
        const now = moment().tz('Asia/Kolkata');
        const bookingStart = now.clone().hour(10).minute(0).second(0);
        const bookingEnd = now.clone().hour(12).minute(0).second(0);
        if (now.isBefore(bookingStart) || now.isAfter(bookingEnd)) {
            throw new common_1.BadRequestException('Appointment can only be booked between 10:00am and 11:00am IST');
        }
        const slotStart = moment.tz(`${slot.date} ${slot.startTime}`, 'YYYY-MM-DD hh:mma', 'Asia/Kolkata');
        const slotEnd = moment.tz(`${slot.date} ${slot.endTime}`, 'YYYY-MM-DD hh:mma', 'Asia/Kolkata');
        if (appointmentMoment.isBefore(slotStart) ||
            appointmentEndMoment.isAfter(slotEnd)) {
            throw new common_1.BadRequestException("Appointment time is outside doctor's slot");
        }
        const doctorId = slot.doctor.id;
        const conflictingAppointment = await this.appointmentRepo
            .createQueryBuilder('appointment')
            .leftJoin('appointment.slot', 'slot')
            .leftJoin('slot.doctor', 'doctor')
            .where('doctor.id = :doctorId', { doctorId })
            .andWhere('slot.date = :date', { date: slot.date })
            .andWhere('appointment.status = :status', {
            status: enum_entity_1.AppointmentStatus.BOOKED,
        })
            .andWhere(`(
    (appointment."appointmentTime"::time BETWEEN :startTime AND :endTime)
    OR
    (
      appointment."appointmentTime"::time < :startTime
      AND (appointment."appointmentTime"::time + interval '30 minutes') > :startTime
    )
  )`, {
            startTime: appointmentMoment.format('HH:mm'),
            endTime: appointmentEndMoment.format('HH:mm'),
        })
            .getOne();
        if (conflictingAppointment) {
            throw new common_1.BadRequestException('Doctor is not available during this 30-minute window');
        }
    }
    async autoExpireAppointments() {
        const now = new Date();
        await this.appointmentRepo
            .createQueryBuilder()
            .update(appointment_entity_1.Appointment)
            .set({ status: enum_entity_1.AppointmentStatus.EXPIRED })
            .where('expiresAt < :now', { now })
            .andWhere('status = :status', { status: enum_entity_1.AppointmentStatus.BOOKED })
            .execute();
    }
    async autoMarkMissedAppointments() {
        const now = moment().tz('Asia/Kolkata');
        const appointments = await this.appointmentRepo
            .createQueryBuilder('appointment')
            .leftJoinAndSelect('appointment.slot', 'slot')
            .where('appointment.status = :status', {
            status: enum_entity_1.AppointmentStatus.BOOKED,
        })
            .getMany();
        for (const appointment of appointments) {
            const appointmentDateTime = moment.tz(`${appointment.slot.date} ${appointment.appointmentTime}`, 'YYYY-MM-DD HH:mm', 'Asia/Kolkata');
            const graceTime = appointmentDateTime.clone().add(10, 'minutes');
            if (now.isAfter(graceTime)) {
                appointment.status = enum_entity_1.AppointmentStatus.MISSED;
                await this.appointmentRepo.save(appointment);
            }
        }
    }
};
exports.AppointmentTimeService = AppointmentTimeService;
__decorate([
    (0, schedule_1.Cron)('*/5 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentTimeService.prototype, "autoExpireAppointments", null);
__decorate([
    (0, schedule_1.Cron)('*/5 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentTimeService.prototype, "autoMarkMissedAppointments", null);
exports.AppointmentTimeService = AppointmentTimeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppointmentTimeService);
//# sourceMappingURL=appointment.time.service.js.map