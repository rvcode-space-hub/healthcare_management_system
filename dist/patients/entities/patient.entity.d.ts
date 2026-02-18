export declare class Patient {
    id: string;
    name: string;
    email: string;
    password: string;
    age: string;
    gender: string;
    role: string;
    hashPassword(): Promise<void>;
}
