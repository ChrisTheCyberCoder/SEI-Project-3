import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 300 },
  rating: { type: Number, required: true, min: 1, max: 5 },

  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true  },
}, {
  timestamps: true,
})


const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 400 },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  comments: [commentSchema],
})

itemSchema.virtual('avgRating').get(function () {
  if (!this.comments.length) return 'Unrated'
  const avg = this.comments.reduce((sum, currentComment) => {
    return sum + currentComment.rating
  }, 0)
  return Math.round(avg / this.comments.length)
})

itemSchema.set('toJSON', { virtuals: true })


itemSchema.plugin(uniqueValidator)

export default mongoose.model('Item', itemSchema)


