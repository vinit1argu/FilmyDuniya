const mongoose = require('mongoose');

const connectDb = async ()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/filmydb', {}); 
          console.log('Connected to MongoDB');
       } 
    catch (error) {
    console.error('MongoDB connection error:', error);
  } 
    }

    module.exports = {
        connectDb,
        mongoose,
      };