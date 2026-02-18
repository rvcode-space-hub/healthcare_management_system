import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { RegisterDoctorDto } from '../auth/dto/register.doctro';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
export declare class DoctorsService {
    private doctorRepo;
    constructor(doctorRepo: Repository<Doctor>);
    register(registerDto: RegisterDoctorDto): Promise<Doctor>;
    getdoctorProfile(userId: string): Promise<Doctor | null>;
    findByEmail(email: string): Promise<Doctor | null>;
    update(id: string, dto: UpdateDoctorDto): Promise<Doctor>;
    findAll(): Promise<Doctor[]>;
}
