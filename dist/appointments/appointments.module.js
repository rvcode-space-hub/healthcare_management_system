"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const appointments_service_1 = require("./appointments.service");
const appointments_controller_1 = require("./appointments.controller");
const slot_entity_1 = require("../slots/entities/slot.entity");
const reschedule_appointment_service_1 = require("./reschedule-appointment.service");
const appointment_time_service_1 = require("./appointment.time.service");
const patient_entity_1 = require("../patients/entities/patient.entity");
const mail_module_1 = require("../mail/mail.module");
let AppointmentsModule = class AppointmentsModule {
};
exports.AppointmentsModule = AppointmentsModule;
exports.AppointmentsModule = AppointmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([appointment_entity_1.Appointment, slot_entity_1.Slot, patient_entity_1.Patient]), mail_module_1.MailModule],
        providers: [
            appointments_service_1.AppointmentsService,
            reschedule_appointment_service_1.RescheduleAppointmentService,
            appointment_time_service_1.AppointmentTimeService,
        ],
        controllers: [appointments_controller_1.AppointmentsController],
    })
], AppointmentsModule);
//# sourceMappingURL=appointments.module.js.map