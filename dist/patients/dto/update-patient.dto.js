"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePatientDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const register_patient_1 = require("../../auth/dto/register.patient");
class UpdatePatientDto extends (0, mapped_types_1.PartialType)(register_patient_1.RegisterPatinetDto) {
}
exports.UpdatePatientDto = UpdatePatientDto;
//# sourceMappingURL=update-patient.dto.js.map