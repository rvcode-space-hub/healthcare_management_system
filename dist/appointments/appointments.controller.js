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
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const appointments_service_1 = require("./appointments.service");
const reschedule_appointment_service_1 = require("./reschedule-appointment.service");
const book_appointment_dto_1 = require("./dto/book-appointment.dto");
const reschedule_appointment_dto_1 = require("./dto/reschedule.appointment.dto");
let AppointmentsController = class AppointmentsController {
    appointmentService;
    rescheduleAppointmentService;
    constructor(appointmentService, rescheduleAppointmentService) {
        this.appointmentService = appointmentService;
        this.rescheduleAppointmentService = rescheduleAppointmentService;
    }
    book(dto) {
        return this.appointmentService.bookAppointment(dto);
    }
    getForPatient(patientId) {
        return this.appointmentService.getPatientAppointments(patientId);
    }
    getAll() {
        return this.appointmentService.getAllAppointments();
    }
    cancel(id) {
        return this.appointmentService.cancelAppointment(id);
    }
    reschedule(id, dto) {
        return this.rescheduleAppointmentService.rescheduleAppointment(id, dto.newSlotId);
    }
    markAsAttended(id) {
        return this.appointmentService.markAsAttended(id);
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Post)('book'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_appointment_dto_1.BookAppointmentDto]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "book", null);
__decorate([
    (0, common_1.Get)('patient/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "getForPatient", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)('cancel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "cancel", null);
__decorate([
    (0, common_1.Patch)('/reschedule'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reschedule_appointment_dto_1.RescheduleAppointmentDto]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "reschedule", null);
__decorate([
    (0, common_1.Patch)(':id/attend'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "markAsAttended", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, common_1.Controller)('appointments'),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService,
        reschedule_appointment_service_1.RescheduleAppointmentService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map