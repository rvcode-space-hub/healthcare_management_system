import { JwtService } from '@nestjs/jwt';
import { DoctorsService } from '../doctors/doctors.service';
import { PatientsService } from '../patients/patients.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly doctorsService;
    private readonly patientsService;
    constructor(jwtService: JwtService, doctorsService: DoctorsService, patientsService: PatientsService);
    validateUser(email: string, password: string): Promise<import("../doctors/entities/doctor.entity").Doctor | import("../patients/entities/patient.entity").Patient>;
    login(email: string, password: string): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
        token: string;
    }>;
}
