const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../model/loginModel");
// const User_Data = require("../../model/userModel");
const loginRepository = require("./loginRepository");


const secretKey = "test-key";

const tokenBlacklist = [];

const loginService = {
  

  async register({ username, password , Name , mobile , address , gender }, res) {
    try {
      if (password.length < 5) {
        res.json({ message: "Invalid username or password. Again try" });
      } else {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = new User({ username, password: hashedPassword , Name , mobile , address , gender });

        // console.log(user);

        await loginRepository.saveUser(user);

        res.json({ message: "User registered successfully" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },



  // login registered user
  async login({ username, password }, res) {
    try {
      const user = await loginRepository.findUserByUsername(username);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Wrong password entered." });
      }

      // generate access token
      const access_token_expiration = "1d";
      const accessToken = jwt.sign(
        { userId: user._id, username: user.username },
        secretKey,
        { expiresIn: access_token_expiration }
      );
      // generate refresh token
      const refresh_token_expiration = "7d"; 
      const refreshToken = jwt.sign(
        { userId: user._id, username: user.username },
        secretKey,
        { expiresIn: refresh_token_expiration }
      );

     
      const alldata = await User.find({},'username password');
      res.status(200).json({
        accessToken,
        access_token_expiration,
        refreshToken,
        refresh_token_expiration,
        alldata 
      });
    } 
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  // Refresh access token
  async refreshToken({ refreshToken }, res) {
    // checking refreshToken is empty or not
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token given" });
    }

    try {
      // verifying and decoding the refresh token
      const decoded = jwt.verify(refreshToken, secretKey);

      if (!decoded || !decoded.userId) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      // finding user with userId from refresh token
      const user = await loginRepository.findUserById(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      // generating new access token
      const access_token_expiration = "1d"; // access token expires in 30 minutes
      const accessToken = jwt.sign(
        { userId: user._id, username: user.username },
        secretKey,
        { expiresIn: access_token_expiration }
      );
      // respond with new access token and expiry time
      res.status(200).json({ accessToken, access_token_expiration });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


  async logout(req, res) {
    // console.log(req.headers)
    try {
      const tokenToInvalidate = req.headers.authorization.split(' ')[1];
      // console.log(tokenToInvalidate)
      if (!tokenToInvalidate) {
        return res.status(400).json({ message: 'Token to invalidate is missing' });
      }

      let decodedToken;

      try {
        decodedToken = jwt.verify(tokenToInvalidate, secretKey);
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      if (decodedToken.exp <= Date.now() / 1000) {
        return res.status(401).json({ message: 'Token has expired' });
      }

      if (tokenBlacklist.includes(tokenToInvalidate)) {
        return res.status(401).json({ message: 'Token is already invalidated' });
      }

      tokenBlacklist.push(tokenToInvalidate);

      res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // viewing all the registered users
  async getUsers(res) {
    try {
      const users = await loginRepository.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },



  async getCurrentUser(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
      }
      const decodedToken = jwt.verify(token, secretKey);
      if (!decodedToken || !decodedToken.userId) {
        return res.status(401).json({ message: 'Invalid access token' });
      }
      const user = await loginRepository.findUserById(decodedToken.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update current logged-in user
async updateUser(userId, userData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUser;
  } catch (err) {
    throw new Error(`Error updating user: ${err.message}`);
  }
},


async addLikedMovie(userId, movieId) {
  try {
    return await loginRepository.addLikedMovie(userId, movieId);
  } catch (err) {
    throw new Error(`Error adding liked movie: ${err.message}`);
  }
},

async removeLikedMovie(userId, movieId) {
  try {
    return await loginRepository.removeLikedMovie(userId, movieId);
  } catch (err) {
    throw new Error(`Error removing liked movie: ${err.message}`);
  }
},

async addLikedTVSeries(userId, seriesId) {
  try {
    return await loginRepository.addLikedTVSeries(userId, seriesId);
  } catch (err) {
    throw new Error(`Error adding liked TV series: ${err.message}`);
  }
},

async removeLikedTVSeries(userId, seriesId) {
  try {
    return await loginRepository.removeLikedTVSeries(userId, seriesId);
  } catch (err) {
    throw new Error(`Error removing liked TV series: ${err.message}`);
  }
},

async getLikedMovies(userId) {
  return await loginRepository.getLikedMovies(userId);
},

async getLikedTVSeries(userId) {
  return await loginRepository.getLikedTVSeries(userId);
},



};




module.exports = loginService;