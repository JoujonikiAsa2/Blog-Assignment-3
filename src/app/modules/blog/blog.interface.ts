import mongoose from 'mongoose'

//blog interface
export type TBlog = {
  title: string
  content: string
  author: mongoose.Schema.Types.ObjectId
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}
