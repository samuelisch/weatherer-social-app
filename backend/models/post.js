const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

postSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
})

module.exports = mongoose.model('Post', postSchema)