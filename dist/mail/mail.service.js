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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const moment = require("moment-timezone");
let MailService = MailService_1 = class MailService {
    mailerService;
    logger = new common_1.Logger(MailService_1.name);
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendAppointmentBookedEmail(to, name, doctorName, slotDate, appointmentStartTime) {
        try {
            const startMoment = moment.tz(`${slotDate} ${appointmentStartTime}`, 'YYYY-MM-DD HH:mm', 'Asia/Kolkata');
            const endMoment = startMoment.clone().add(30, 'minutes');
            await this.mailerService.sendMail({
                to,
                from: process.env.MAIL_FROM || 'infowebservices2024@gmail.com',
                subject: '✅ Appointment Booked Successfully!',
                html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Your appointment has been <strong>successfully booked</strong> on:</p>
            <ul>
              <li><strong>Date:</strong> ${slotDate}</li>
              <li><strong>Time:</strong> ${startMoment.format('HH:mm')} - ${endMoment.format('HH:mm')}</li>
              <li><strong>Doctor:</strong> ${doctorName}</li>
            </ul>
            <p>Thank you for using <strong>SCHEDULA</strong>!</p>
            <p style="margin-top:20px;">Regards,<br/>SCHEDULA Team</p>
          </div>
        `,
            });
            this.logger.log(`✅ Appointment email sent to ${to}`);
        }
        catch (error) {
            this.logger.error(`❌ Failed to send appointment email to ${to}`, error.stack);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map