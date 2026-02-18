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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const typeorm_1 = require("typeorm");
const doctor_entity_1 = require("../../doctors/entities/doctor.entity");
const shift_enum_1 = require("./enums/shift.enum");
let Slot = class Slot {
    id;
    date;
    startTime;
    endTime;
    isAvailable;
    shift;
    maxBookingsPerSlot;
    doctor;
};
exports.Slot = Slot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Slot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Slot.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Slot.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Slot.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Slot.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: shift_enum_1.ShiftType,
        default: shift_enum_1.ShiftType.MORNING,
    }),
    __metadata("design:type", String)
], Slot.prototype, "shift", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 100 }),
    __metadata("design:type", Number)
], Slot.prototype, "maxBookingsPerSlot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doctor_entity_1.Doctor, (doctor) => doctor.slots, { onDelete: 'CASCADE' }),
    __metadata("design:type", doctor_entity_1.Doctor)
], Slot.prototype, "doctor", void 0);
exports.Slot = Slot = __decorate([
    (0, typeorm_1.Entity)()
], Slot);
//# sourceMappingURL=slot.entity.js.map