import { Slot } from './entities/slot.entity';
import { Repository } from 'typeorm';
import { CreateSlotDto } from './dto/create-slot.dto';
import { Doctor } from '../doctors/entities/doctor.entity';
import { UpdateSlotDto } from './dto/update.slot.dto';
export declare class SlotsService {
    private slotRepository;
    private doctorRepository;
    constructor(slotRepository: Repository<Slot>, doctorRepository: Repository<Doctor>);
    create(createSlotDto: CreateSlotDto): Promise<Slot>;
    findAll(): Promise<Slot[]>;
    findAvailableSlotsByDoctor(doctorId: string): Promise<Slot[]>;
    update(id: string, dto: UpdateSlotDto): Promise<Slot>;
    markUnavailable(slotId: string): Promise<Slot>;
}
