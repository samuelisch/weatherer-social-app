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
  user: {
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },
  replyToPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
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