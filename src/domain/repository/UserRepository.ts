import User from "../entity/User"

export default interface UserRepository {
    getById(userId: string): Promise<User | null>
    save(phone: string): Promise<User>
    getUsers(): Promise<Array<User>>
}