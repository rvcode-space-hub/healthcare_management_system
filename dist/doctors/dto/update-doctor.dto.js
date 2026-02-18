"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDoctorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const register_doctro_1 = require("../../auth/dto/register.doctro");
class UpdateDoctorDto extends (0, mapped_types_1.PartialType)(register_doctro_1.RegisterDoctorDto) {
}
exports.UpdateDoctorDto = UpdateDoctorDto;
//# sourceMappingURL=update-doctor.dto.js.map