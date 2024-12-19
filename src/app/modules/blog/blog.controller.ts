import httpStatus from 'http-status'
import asyncWrapper from '../../utils/asyncWrapper'
import { sendResponse } from '../../utils/sendResponse'
import { blogServices } from './blog.service'

const createBlog = asyncWrapper(async (req, res) => {
  const { user } = req
  req.body.author = user.id
  const result = await blogServices.createBlogIntoDB(req.body)
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  })
})

//update blog
const updateBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params
  const blog = req.body
  const result = await blogServices.updateBlogIntoDB(id, blog)
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  })
})

const deleteBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params
  await blogServices.deleteBlogFromDB(id)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  })
})

export const blogControllers = {
  createBlog,
  updateBlog,
  deleteBlog
}
