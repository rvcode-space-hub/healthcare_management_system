import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { Slot } from 'src/slots/entities/slot.entity';
export declare class RescheduleAppointmentService {
    private readonly appointmentRepo;
    private readonly slotRepo;
    constructor(appointmentRepo: Repository<Appointment>, slotRepo: Repository<Slot>);
    rescheduleAppointment(id: string, newSlotId: string): Promise<Appointment>;
}
