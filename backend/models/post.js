const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 1
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  ],
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  replyToPost: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
  ],
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
  ]
});

postSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
})

module.exports = mongoose.model('Post', postSchema)