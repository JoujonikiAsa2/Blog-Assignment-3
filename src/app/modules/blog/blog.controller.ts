import httpStatus from "http-status";
import asyncWrapper from "../../utils/asyncWrapper";
import { sendResponse } from "../../utils/sendResponse";
import { blogServices } from "./blog.service";

const createBlog = asyncWrapper(async (req, res) => {
    const {user} = req
    req.body.author = user.id
    const result = await blogServices.createBlogIntoDB(req.body)
    sendResponse(res, {
        success: true,
        message: 'Blog created successfully',
        statusCode: httpStatus.CREATED,
        data: result,
    })
})

export const blogControllers = {
    createBlog
}