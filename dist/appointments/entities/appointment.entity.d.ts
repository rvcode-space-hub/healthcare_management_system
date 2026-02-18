import { Patient } from '../../patients/entities/patient.entity';
import { Slot } from '../../slots/entities/slot.entity';
import { AppointmentStatus } from './enum.entity';
export declare class Appointment {
    id: string;
    date: string;
    patientId: string;
    slotId: string;
    patient: Patient;
    slot: Slot;
    isEmergency: boolean;
    expiresAt: Date;
    appointmentTime: string;
    attendedAt?: Date;
    status: AppointmentStatus;
}
