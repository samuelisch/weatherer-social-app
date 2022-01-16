const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 1
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
});

commentSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
})

module.exports = mongoose.model('Comment', commentSchema)