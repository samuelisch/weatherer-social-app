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
    }
  ],
});

postSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
})

module.exports = mongoose.model('Post', postSchema)