import { PatientsService } from './patients.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
export declare class PatientsController {
    private patientsService;
    constructor(patientsService: PatientsService);
    updateDoctor(id: string, dto: UpdatePatientDto): Promise<Patient>;
    findOnePatient(id: string): Promise<Patient>;
    getAll(): Promise<Patient[]>;
}
