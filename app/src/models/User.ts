import { model, Schema, Document } from 'mongoose'
import configs from '../config/config'
import generateString from '../utils/auth/generateString'
import { compareString, hashString } from '../utils/auth/hash'
import logger from '../utils/logger'

export interface UserDocument extends Document {
  email: string
  first_name: string
  last_name: string
  password: string
  createdAt: Date
  updatedAt: Date
  getFullName: () => string
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },

    first_name: {
      type: String,
      trim: true,
    },

    last_name: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
    },

    trials: {
      type: Number,
      default: 0,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    account_type: {
      type: String,
      enum: ['free', 'paid'],
      default: 'free',
    },

    account_verified: {
      type: Boolean,
      default: false,
    },

    account_locked: {
      type: Boolean,
      default: false,
    },

    email_verified: {
      type: Boolean,
      default: false,
    },

    otp: String,
    otp_time_expiry: Date,
    password_changed_at: Date,
    verificationStringExpiry: Date,
    verificationString: String,
  },
  {
    timestamps: true,
    collection: 'users',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const UserModel = model<UserDocument>('User', userSchema)

export default UserModel
