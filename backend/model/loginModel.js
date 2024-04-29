const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: 5,
    },
    
    Name: {
      type: String,
      required: [true, 'Please enter your name']
    },
    mobile: {
      type: Number, 
      required: [true, 'Please enter your mobile number']
    },
    address: {
      type: String,
      required: [true, 'Please enter your address']
    },
    gender: {
      type: String,
      required: [true, 'Please select your gender']
    },
    likedMovies: [Number] ,
    likedTVSeries: [Number],
  });

const User = mongoose.model('User', userSchema);

module.exports = User;