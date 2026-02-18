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
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const patient_entity_1 = require("./entities/patient.entity");
const bcrypt = require("bcrypt");
let PatientsService = class PatientsService {
    patientRepo;
    constructor(patientRepo) {
        this.patientRepo = patientRepo;
    }
    async register(registerDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const newPatient = this.patientRepo.create({
            ...registerDto,
            password: hashedPassword,
        });
        return this.patientRepo.save(newPatient);
    }
    async update(id, updateDto) {
        const patient = await this.patientRepo.preload({
            id,
            ...updateDto,
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
        }
        return this.patientRepo.save(patient);
    }
    async getpatientProfile(userId) {
        return this.patientRepo.findOne({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                age: true,
                gender: true,
            },
        });
    }
    async findByEmail(email) {
        return this.patientRepo.findOne({ where: { email } });
    }
    async findAll() {
        return this.patientRepo.find();
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PatientsService);
//# sourceMappingURL=patients.service.js.map