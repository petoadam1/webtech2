const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Engedélyez');

  if (!authHeader) {
    const error = new Error('Nincs hitelesítve!');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];

  let decodedToken;

  try {

    decodedToken = jwt.verify(token, 'secretfortoken');

  } catch (err) {

    err.statusCode = 500;
    throw err;

  }

  if (!decodedToken) {
    const error = new Error('Nincs hitelesítve!');
    error.statusCode = 401;
    throw error;
  }
  
  req.isLoggedIn = true;

  req.userId = decodedToken.userId;

  req.email = decodedToken.email;

  next();

};