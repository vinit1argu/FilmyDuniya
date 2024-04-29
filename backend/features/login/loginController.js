const loginService = require('./loginService');

const loginController = {

  
  protectedRoute: (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  },

  
  async register(req, res) {
    try {
      await loginService.register(req.body, res);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  
  async login(req, res) {
    try {
      await loginService.login(req.body, res);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  
 
  async logout(req, res) {
    try {
      await loginService.logout(req, res);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  
  async refreshToken(req, res) {
    try {
      await loginService.refreshToken(req.body, res);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


  async getUsers(req, res) {
    try {
      await loginService.getUsers(res);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


  async getCurrentUser(req, res) {
    await loginService.getCurrentUser(req, res);
  },


  async updateUser(req, res) {
    const { userId } = req.user; 
    const { username, password, Name, mobile, address, gender } = req.body; 
    const userData = { username, password, Name, mobile, address, gender };
    try {
      const updatedUser = await loginService.updateUser(userId, userData); 
      res.json(updatedUser); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  
  async addLikedMovie(req, res) {
    const { userId } = req.user;
    const { movieId } = req.body;
    try {
      const updatedUser = await loginService.addLikedMovie(userId, movieId);
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async removeLikedMovie(req, res) {
    const { userId } = req.user;
    const { movieId } = req.params;
    try {
      const updatedUser = await loginService.removeLikedMovie(userId, movieId);
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async addLikedTVSeries(req, res) {
    const { userId } = req.user;
    const { seriesId } = req.body;
    try {
      const user = await loginService.addLikedTVSeries(userId, seriesId);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async removeLikedTVSeries(req, res) {
    const { userId } = req.user;
    const { seriesId } = req.params;
    try {
      const user = await loginService.removeLikedTVSeries(userId, seriesId);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getLikedMovies(req, res) {
    const { userId } = req.user;
    try {
      const likedMovies = await loginService.getLikedMovies(userId);
      res.json(likedMovies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  
  async getLikedTVSeries(req, res) {
    const { userId } = req.user;
    try {
      const likedTVSeries = await loginService.getLikedTVSeries(userId);
      res.json(likedTVSeries);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  
};



module.exports = loginController;
