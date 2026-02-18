"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const slot_entity_1 = require("./entities/slot.entity");
const typeorm_2 = require("typeorm");
const doctor_entity_1 = require("../doctors/entities/doctor.entity");
let SlotsService = class SlotsService {
    slotRepository;
    doctorRepository;
    constructor(slotRepository, doctorRepository) {
        this.slotRepository = slotRepository;
        this.doctorRepository = doctorRepository;
    }
    async create(createSlotDto) {
        const doctor = await this.doctorRepository.findOne({
            where: { id: createSlotDto.doctorId },
        });
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor not found');
        }
        const slot = this.slotRepository.create({
            date: createSlotDto.date,
            startTime: createSlotDto.startTime,
            endTime: createSlotDto.endTime,
            isAvailable: true,
            shift: createSlotDto.shift,
            doctor,
        });
        return await this.slotRepository.save(slot);
    }
    async findAll() {
        return this.slotRepository.find({ relations: ['doctor'] });
    }
    async findAvailableSlotsByDoctor(doctorId) {
        return this.slotRepository.find({
            where: {
                doctor: {
                    id: doctorId,
                },
                isAvailable: true,
            },
            relations: ['doctor'],
        });
    }
    async update(id, dto) {
        const slot = await this.slotRepository.preload({
            id,
            ...dto,
        });
        if (!slot)
            throw new common_1.NotFoundException('Slot not found');
        return this.slotRepository.save(slot);
    }
    async markUnavailable(slotId) {
        const slot = await this.slotRepository.findOne({ where: { id: slotId } });
        if (!slot)
            throw new common_1.NotFoundException('Slot not found');
        console.log('Max bookings from DB:', slot.maxBookingsPerSlot);
        slot.isAvailable = false;
        return this.slotRepository.save(slot);
    }
};
exports.SlotsService = SlotsService;
exports.SlotsService = SlotsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(slot_entity_1.Slot)),
    __param(1, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SlotsService);
//# sourceMappingURL=slots.service.js.map