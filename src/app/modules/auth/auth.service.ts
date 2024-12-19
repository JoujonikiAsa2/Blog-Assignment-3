import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const registerUserIntoDB = async(payload: TLoginUser) => {
    return await User.create(payload)
}

export const authService = {
    registerUserIntoDB
}