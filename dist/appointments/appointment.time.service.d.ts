import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { Slot } from '../slots/entities/slot.entity';
export declare class AppointmentTimeService {
    private readonly appointmentRepo;
    constructor(appointmentRepo: Repository<Appointment>);
    validateAppointmentTime(slot: Slot, appointmentTime: string, isEmergency: boolean): Promise<void>;
    autoExpireAppointments(): Promise<void>;
    autoMarkMissedAppointments(): Promise<void>;
}
