import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { TBlog } from './blog.interface'
import { Blog } from './blog.model'

const createBlogIntoDB = async (payload: TBlog) => {
  const createdBlog = await Blog.create(payload)
  const { _id } = createdBlog
  const result = await Blog.findById(_id)
    .populate('author')
    .select('title content author')
  return result
}

//update blog
const updateBlogIntoDB = async (id: string, payload: TBlog) => {
  //check if blog exists
  const isBlogExists = await Blog.findById(id)
  if (!isBlogExists) {
    throw new ApiError('Blog not found', httpStatus.NOT_FOUND)
  }

  //update blog
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true })
    .populate('author')
    .select('title content author')
  return result
}

//delete blog
const deleteBlogFromDB = async (id: string) => {
    const isBlogExists = await Blog.findById(id)
    if (!isBlogExists) {
      throw new ApiError('Blog not found', httpStatus.NOT_FOUND)
    }
    const result = await Blog.findByIdAndDelete(id)
    return result
}

export const blogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB
}
