import httpStatus from "http-status"
import asyncWrapper from "../../utils/asyncWrapper"
import { authService } from "./auth.service"

const registerUser = asyncWrapper(async (req, res) => {
    const result = await authService.registerUserIntoDB(req.body)
    res.status(httpStatus.OK).json({
        success: true,
        message: 'User created successfully',
        data: result
    })
})
export const authController = {
    registerUser
}