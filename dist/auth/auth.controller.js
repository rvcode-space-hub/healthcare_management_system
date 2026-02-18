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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_doctro_1 = require("./dto/register.doctro");
const register_patient_1 = require("./dto/register.patient");
const doctors_service_1 = require("../doctors/doctors.service");
const patients_service_1 = require("../patients/patients.service");
const jwt_strategy_1 = require("../auth/jwt.strategy");
let AuthController = class AuthController {
    authService;
    doctorService;
    patientService;
    constructor(authService, doctorService, patientService) {
        this.authService = authService;
        this.doctorService = doctorService;
        this.patientService = patientService;
    }
    async login(loginDto) {
        return this.authService.login(loginDto.email, loginDto.password);
    }
    async registerDoctor(dto) {
        return this.doctorService.register(dto);
    }
    async registerPatient(dto) {
        return this.patientService.register(dto);
    }
    logoutPatient() {
        return { message: 'Logout successful' };
    }
    logoutdoctor() {
        return { message: 'Logout successful' };
    }
    getAllPatients() {
        return this.patientService.findAll();
    }
    getpatientProfile(req) {
        const userId = req.user.id;
        return this.patientService.getpatientProfile(userId);
    }
    getdoctorProfile(req) {
        const userId = req.user.id;
        return this.doctorService.getdoctorProfile(userId);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register/doctor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_doctro_1.RegisterDoctorDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerDoctor", null);
__decorate([
    (0, common_1.Post)('register/patient'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_patient_1.RegisterPatinetDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerPatient", null);
__decorate([
    (0, common_1.Post)('patient/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logoutPatient", null);
__decorate([
    (0, common_1.Post)('doctor/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logoutdoctor", null);
__decorate([
    (0, common_1.Get)('patient'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAllPatients", null);
__decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.jwtStrategy),
    (0, common_1.Get)('patient/profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getpatientProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.jwtStrategy),
    (0, common_1.Get)('doctor/profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getdoctorProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        doctors_service_1.DoctorsService,
        patients_service_1.PatientsService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map