const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, 'Minimum username length of 3 required'],
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
    minLength: [5, 'Minimum password length of 5 required']
  },
  date: {
    type: String,
    required: true
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);