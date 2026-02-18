import { SlotsService } from './slots.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update.slot.dto';
export declare class SlotsController {
    private readonly slotsService;
    constructor(slotsService: SlotsService);
    create(createSlotDto: CreateSlotDto): Promise<import("./entities/slot.entity").Slot>;
    findAll(): Promise<import("./entities/slot.entity").Slot[]>;
    getSlotsByDoctor(doctorId: string): Promise<import("./entities/slot.entity").Slot[]>;
    update(id: string, dto: UpdateSlotDto): Promise<import("./entities/slot.entity").Slot>;
    markUnavailable(id: string): Promise<import("./entities/slot.entity").Slot>;
}
