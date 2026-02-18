import { ShiftType } from '../entities/enums/shift.enum';
export declare class UpdateSlotDto {
    date: string;
    startTime: string;
    endTime: string;
    shift: ShiftType;
    doctorId: string;
}
