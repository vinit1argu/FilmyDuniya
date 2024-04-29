const jwt = require('jsonwebtoken');
const secretKey = 'test-key';

const loginMiddleware = {
  protectRoute(req, res, next) {
    try {
      const accessToken = req.headers['authorization'];

      if (!accessToken) {
        return res.status(401).json({ error: 'Access token is missing' });
      }

      const tokenParts = accessToken.split(' ');

      if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid access token format' });
      }
      const decodedToken = jwt.verify(tokenParts[1], secretKey);
      req.user = decodedToken;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid access token' });
    }
  },
};

module.exports = loginMiddleware;