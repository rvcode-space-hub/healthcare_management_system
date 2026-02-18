import { AppointmentsService } from './appointments.service';
import { RescheduleAppointmentService } from './reschedule-appointment.service';
import { BookAppointmentDto } from './dto/book-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule.appointment.dto';
import { Appointment } from './entities/appointment.entity';
export declare class AppointmentsController {
    private readonly appointmentService;
    private readonly rescheduleAppointmentService;
    constructor(appointmentService: AppointmentsService, rescheduleAppointmentService: RescheduleAppointmentService);
    book(dto: BookAppointmentDto): Promise<Appointment>;
    getForPatient(patientId: string): Promise<Appointment[]>;
    getAll(): Promise<Appointment[]>;
    cancel(id: string): Promise<Appointment>;
    reschedule(id: string, dto: RescheduleAppointmentDto): Promise<Appointment>;
    markAsAttended(id: string): Promise<Appointment>;
}
