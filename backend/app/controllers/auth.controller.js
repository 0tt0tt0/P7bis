const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (userId) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};
/*const jwt = require('jsonwebtoken');
//const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};*/
// Create and Save a new User
exports.signUp = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Le contenu ne peut être nul"
      });
    }
    // Create a User
    const user = new User({
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: req.body.password
    });
    // Save User in the database
    User.create(user, (err, data) => {
      if (err) 
        res.status(500).send({
          message:
            err.message || "Une erreur a eu lieu pendant la création de l'utilisateur."
        });
      else res.send(data);
    });
  };

exports.signIn = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password);
    try {
        const userId = await User.login(email, password);
        console.log(userId);
        const token = createToken();
        console.log(token);
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.status(200).json({ user})
    }catch (err){
        //const errors = signInErrors(err);
        res.status(400);
    }
}
/*exports.signUp = async (req, res) => {
console.log(req.body);
  const {pseudo, email, password} = req.body

  try {
    const user = await User.create({pseudo, email, password });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    res.status(500)
  }
}
*/

/*
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}*/