import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    private readonly logger;
    constructor(mailerService: MailerService);
    sendAppointmentBookedEmail(to: string, name: string, doctorName: string, slotDate: string, appointmentStartTime: string): Promise<void>;
}
