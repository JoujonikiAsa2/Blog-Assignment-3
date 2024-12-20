import { JwtPayload } from "jsonwebtoken";

// Extend Request interface
declare global {
    namespace Express {
        interface Request {
            user: JwtPayload
        }
    }
}