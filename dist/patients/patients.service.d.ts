import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { RegisterPatinetDto } from '../auth/dto/register.patient';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientsService {
    private patientRepo;
    constructor(patientRepo: Repository<Patient>);
    register(registerDto: RegisterPatinetDto): Promise<Patient>;
    update(id: string, updateDto: UpdatePatientDto): Promise<Patient>;
    getpatientProfile(userId: string): Promise<Patient | null>;
    findByEmail(email: string): Promise<Patient | null>;
    findAll(): Promise<Patient[]>;
}
