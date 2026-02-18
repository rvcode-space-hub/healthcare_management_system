import { Doctor } from '../../doctors/entities/doctor.entity';
import { ShiftType } from './enums/shift.enum';
export declare class Slot {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    shift: ShiftType;
    maxBookingsPerSlot: number;
    doctor: Doctor;
}
