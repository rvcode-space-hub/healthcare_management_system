import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDoctorDto } from './dto/register.doctro';
import { RegisterPatinetDto } from './dto/register.patient';
import { DoctorsService } from '../doctors/doctors.service';
import { PatientsService } from '../patients/patients.service';
export declare class AuthController {
    private authService;
    private doctorService;
    private patientService;
    constructor(authService: AuthService, doctorService: DoctorsService, patientService: PatientsService);
    login(loginDto: LoginDto): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
        token: string;
    }>;
    registerDoctor(dto: RegisterDoctorDto): Promise<import("../doctors/entities/doctor.entity").Doctor>;
    registerPatient(dto: RegisterPatinetDto): Promise<import("../patients/entities/patient.entity").Patient>;
    logoutPatient(): {
        message: string;
    };
    logoutdoctor(): {
        message: string;
    };
    getAllPatients(): Promise<import("../patients/entities/patient.entity").Patient[]>;
    getpatientProfile(req: any): Promise<import("../patients/entities/patient.entity").Patient | null>;
    getdoctorProfile(req: any): Promise<import("../doctors/entities/doctor.entity").Doctor | null>;
}
