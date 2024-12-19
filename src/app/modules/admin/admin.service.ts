import httpStatus from "http-status"
import ApiError from "../../errors/ApiError"
import { User } from "../user/user.model"

const blockUser = async(userId: string) =>{
    const isUserExists = await User.findById(userId)
    if(!isUserExists){
        throw new ApiError("User not found", httpStatus.BAD_REQUEST)
    }
    const result = await User.findByIdAndUpdate(userId, {isBlocked: true}, {new: true})
    return result
}

export const adminServices = {
    blockUser
}