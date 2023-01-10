import { model, Schema, Document } from 'mongoose'
import { UserDocument } from './User'

export interface ImageDocument extends Document {
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  userId: UserDocument['id']
  title: String
  description: String
}

const imageSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

const ImageModel = model<ImageDocument>('Image', imageSchema)

export default ImageModel
