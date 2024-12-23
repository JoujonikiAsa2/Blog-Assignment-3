import { TBlog } from './blog.interface'
import { Blog } from './blog.model'
import QueryBuilder from '../../builder/queryBuilder'
import { searchableFieldsForBlog, selectedFileld } from './blog.constant'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

//create blog
const createBlogIntoDB = async (payload: TBlog) => {
  const createdBlog = await Blog.create(payload)
  const { _id } = createdBlog
  const result = await Blog.findById(_id)
    .populate('author', '-password')
    .select(selectedFileld)
  return result
}

//find all blogs
const findAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate('author', '-password').select('title content'),
    query,
  )
    .search(searchableFieldsForBlog)
    .filter()
    .sort()

  const result = await blogQuery.modelQuery
  return result
}

export default findAllBlogsFromDB

//update blog
const updateBlogIntoDB = async (
  id: string,
  user: JwtPayload,
  payload: TBlog,
) => {
  const isBlogExists = await Blog.findById(id)
  if (isBlogExists === null || isBlogExists === undefined) {
    throw new ApiError('Blog not found', httpStatus.NOT_FOUND)
  }

  //check the blog and author who try to update blog
  const isValidBlogAuthor = await Blog.findOne({ _id: id, author: user?.id })
  if (!isValidBlogAuthor) {
    const error = new Error()
    error.name = 'AuthorizationError'
    throw error
  }

  //update blog
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true })
    .populate('author', '-password')
    .select(selectedFileld)
  return result
}

//delete blog
const deleteBlogFromDB = async (id: string, user: JwtPayload) => {
  const isBlogExists = await Blog.findById(id)
  if (isBlogExists === null || isBlogExists === undefined) {
    throw new ApiError('Blog not found', httpStatus.NOT_FOUND)
  }

  ////check the blog and author who try to delete blog
  const isValidBlogAuthor = await Blog.findOne({ _id: id, author: user?.id })
  if (!isValidBlogAuthor) {
    const error = new Error()
    error.name = 'AuthorizationError'
    throw error
  }
  const result = await Blog.findByIdAndDelete(id)
  return result
}

export const blogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  findAllBlogsFromDB,
}
