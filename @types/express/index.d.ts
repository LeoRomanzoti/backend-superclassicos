import User from "../../src/domain/entity/User";

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}