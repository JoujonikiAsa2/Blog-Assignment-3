import { TBlog } from "./blog.interface"
import { Blog } from "./blog.model"

const createBlogIntoDB = async (payload: TBlog) => {
    const createdBlog = await Blog.create(payload)
    const { _id } = createdBlog
    const result  = await Blog.findById(_id).populate('author').select('title content author')
    return result
}

export const blogServices = {
    createBlogIntoDB
}