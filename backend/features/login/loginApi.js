const express = require('express');
const router = express.Router();
const loginController = require('./loginController');
const loginMiddleware = require('../../middleWare/loginMiddleware');

router.post('/register', loginController.register);
router.post('/login', loginController.login);
router.post('/refresh-token', loginController.refreshToken);

router.post('/logout', loginMiddleware.protectRoute, loginController.logout);

router.get('/users', loginController.getUsers);

router.get("/current-user", loginController.getCurrentUser);

router.put("/update-user", loginMiddleware.protectRoute, loginController.updateUser);

router.post("/add", loginMiddleware.protectRoute, loginController.addLikedMovie);
router.delete("/remove/:movieId", loginMiddleware.protectRoute, loginController.removeLikedMovie);

router.post('/add-tv', loginMiddleware.protectRoute, loginController.addLikedTVSeries);
router.delete('/remove-tv/:seriesId', loginMiddleware.protectRoute, loginController.removeLikedTVSeries);

router.get("/liked-movies", loginMiddleware.protectRoute, loginController.getLikedMovies);

router.get("/liked-tv", loginMiddleware.protectRoute, loginController.getLikedTVSeries);


module.exports = router;




module.exports = router;