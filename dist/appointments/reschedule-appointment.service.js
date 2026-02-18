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
exports.RescheduleAppointmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const slot_entity_1 = require("../slots/entities/slot.entity");
const enum_entity_1 = require("./entities/enum.entity");
const moment = require("moment-timezone");
let RescheduleAppointmentService = class RescheduleAppointmentService {
    appointmentRepo;
    slotRepo;
    constructor(appointmentRepo, slotRepo) {
        this.appointmentRepo = appointmentRepo;
        this.slotRepo = slotRepo;
    }
    async rescheduleAppointment(id, newSlotId) {
        const appointment = await this.appointmentRepo.findOne({ where: { id } });
        if (!appointment)
            throw new common_1.NotFoundException('Appointment not found');
        const newSlot = await this.slotRepo.findOne({
            where: { id: newSlotId },
            relations: ['doctor'],
        });
        if (!newSlot)
            throw new common_1.NotFoundException('New slot not found');
        let parsedDate;
        if (moment(newSlot.date, 'YYYY-MM-DD', true).isValid()) {
            parsedDate = moment(newSlot.date, 'YYYY-MM-DD');
        }
        else if (moment(newSlot.date, 'DD-MM-YYYY', true).isValid()) {
            parsedDate = moment(newSlot.date, 'DD-MM-YYYY');
        }
        else {
            throw new common_1.BadRequestException('Invalid new slot date format');
        }
        const endTime = parsedDate.tz('Asia/Kolkata').hour(9).minute(0).toDate();
        appointment.slot = newSlot;
        appointment.status = enum_entity_1.AppointmentStatus.RESCHEDULED;
        appointment.expiresAt = endTime;
        return this.appointmentRepo.save(appointment);
    }
};
exports.RescheduleAppointmentService = RescheduleAppointmentService;
exports.RescheduleAppointmentService = RescheduleAppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(slot_entity_1.Slot)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RescheduleAppointmentService);
//# sourceMappingURL=reschedule-appointment.service.js.map