import httpStatus from "http-status"
import ApiError from "../../errors/ApiError"
import { User } from "../user/user.model"
import { Blog } from "../blog/blog.model"

//block user
const blockUser = async(userId: string) =>{
    const isUserExists = await User.findById(userId)
    if(!isUserExists){
        throw new ApiError("User not found", httpStatus.BAD_REQUEST)
    }
    const result = await User.findByIdAndUpdate(userId, {isBlocked: true}, {new: true})
    return result
}

//Delete Blog
const deleteBlog = async (id: string) => {
    const isBlogExists = await Blog.findById(id)
    if (!isBlogExists) {
      throw new ApiError('Blog not found', httpStatus.NOT_FOUND)
    }
    const result = await Blog.findByIdAndDelete(id)
    return result
  }

export const adminServices = {
    blockUser,
    deleteBlog
}