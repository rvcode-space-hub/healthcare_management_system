import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { BookAppointmentDto } from './dto/book-appointment.dto';
import { Slot } from 'src/slots/entities/slot.entity';
import { AppointmentTimeService } from './appointment.time.service';
import { MailService } from '../mail/mail.service';
import { Patient } from 'src/patients/entities/patient.entity';
export declare class AppointmentsService {
    private readonly appointmentRepo;
    private readonly slotRepo;
    private readonly patientRepo;
    private readonly appointmentTimeService;
    private readonly mailService;
    constructor(appointmentRepo: Repository<Appointment>, slotRepo: Repository<Slot>, patientRepo: Repository<Patient>, appointmentTimeService: AppointmentTimeService, mailService: MailService);
    bookAppointment(dto: BookAppointmentDto): Promise<Appointment>;
    cancelAppointment(id: string): Promise<Appointment>;
    markAsAttended(id: string): Promise<Appointment>;
    getPatientAppointments(patientId: string): Promise<Appointment[]>;
    getAllAppointments(): Promise<Appointment[]>;
}
