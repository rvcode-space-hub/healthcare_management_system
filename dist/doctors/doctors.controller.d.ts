import { DoctorsService } from './doctors.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
export declare class DoctorsController {
    private doctorsService;
    constructor(doctorsService: DoctorsService);
    updateDoctor(id: string, dto: UpdateDoctorDto): Promise<import("./entities/doctor.entity").Doctor>;
    getAll(): Promise<import("./entities/doctor.entity").Doctor[]>;
}
