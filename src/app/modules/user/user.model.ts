import mongoose, { model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.statics.isUserAlreadyExists = async function(email:string){
    const user = await User.findOne({email})
    return user
}

userSchema.statics.isPasswordMatch = async function(hashPassword:string, userPassword:string){
    return await bcrypt.compare(userPassword, hashPassword)
}

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds))
    next()
})

userSchema.post('save', async function (doc,next) {
    doc.password = ""
    next()
})

export const User = model<TUser, UserModel>('User', userSchema)
