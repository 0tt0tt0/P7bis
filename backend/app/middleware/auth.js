const jwt = require('jsonwebtoken');
//Utilisation de dotenv pour le token d'authentification
const dotenv = require('dotenv');
dotenv.config();

//Middleware pour la vérification du token d'identification
module.exports = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const id_user = decodedToken.id_user;
    console.log(id_user);
    if (req.body.id_user && req.body.id_user !== id_user) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};