import { Slot } from '../../slots/entities/slot.entity';
export declare class Doctor {
    id: string;
    name: string;
    email: string;
    password: string;
    specialization: string;
    role: string;
    age: string;
    gender: string;
    slots: Slot[];
}
