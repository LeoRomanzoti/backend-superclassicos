import User from "../entity/User";

export default interface UserRepository {
    getById(userId: string): Promise<User | null>;
    save(name: string, phone: string): Promise<User>;
    getUsers(): Promise<User[]>;
    getByPhone(phone: string): Promise<User | null>;
}
