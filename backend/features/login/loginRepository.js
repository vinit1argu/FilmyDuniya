const User = require('../../model/loginModel');

const loginRepository = {
  async saveUser(user) {
    return user.save();
  },

  async findUserByUsername(username) {
    return User.findOne({ username });
  },

  async findUserById(userId) {
    return User.findById(userId);
  },

  async getAllUsers() {
    return User.find();
  },

  async updateUser(userId, userData) {
    try {
      return await User.findByIdAndUpdate(userId, userData, { new: true });
    } catch (err) {
      throw new Error(`Error updating user: ${err.message}`);
    }
  }
  ,

  
  async addLikedMovie(userId, movieId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.likedMovies.includes(movieId)) {
        user.likedMovies.push(movieId);
        await user.save();
      }
      else if(user.likedMovies.includes(movieId)){
        throw new Error("alreday in list");
      }
      return user;
    } catch (err) {
      throw new Error(`Error adding liked movie: ${err.message}`);
    }
  },

  async removeLikedMovie(userId, movieId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const index = user.likedMovies.indexOf(movieId);
      if (index !== -1) {
        user.likedMovies.splice(index, 1);
        await user.save();
      }

      else if(index === -1){
        throw new Error("Movie is not in list");
      }
      return user;
    } catch (err) {
      throw new Error(`Error removing liked movie: ${err.message}`);
    }
  },
  

  async addLikedTVSeries(userId, seriesId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.likedTVSeries.includes(seriesId)) {
        user.likedTVSeries.push(seriesId);
        await user.save();
      }
      else if(user.likedTVSeries.includes(seriesId)){
        throw new Error("alreday in list");
      }
      return user;
    } catch (err) {
      throw new Error(`Error adding liked TV series: ${err.message}`);
    }
  },

  async removeLikedTVSeries(userId, seriesId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const index = user.likedTVSeries.indexOf(seriesId);
      if (index !== -1) {
        user.likedTVSeries.splice(index, 1);
        await user.save();
      }
      else if (index === -1) {
        throw new Error("Tv Series is not in list");
      }
      return user;
    } catch (err) {
      throw new Error(`Error removing liked TV series: ${err.message}`);
    }
  },
  
  async getLikedMovies(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user.likedMovies;
    } catch (err) {
      throw new Error(`Error getting liked movies: ${err.message}`);
    }
  },
  
  async getLikedTVSeries(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user.likedTVSeries;
    } catch (err) {
      throw new Error(`Error getting liked TV series: ${err.message}`);
    }
  },
  
  

};

module.exports = loginRepository;
