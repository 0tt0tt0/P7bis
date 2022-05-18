const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
//const { signUpErrors, signInErrors } = require('../utils/errors.utils');

//const maxAge = 3 * 24 * 60 * 60 * 1000;

// const createToken = (id) => {
//   return jwt.sign({id}, , {
//     expiresIn: maxAge
//   })
// };
function isValid(value) {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(value);
}
//Check Admin password
exports.checkAdmin = (req, res) => {
  if(req.body.admin_password !== process.env.MDP_ADMIN){
    res.status(400).send({
      message: "Le mot de passe administrateur est incorrect" 
    });
  }
  res.status(200).json({
    check_admin: 1,
    message: "Vous êtes administrateur"
  }) 
}
// Create and Save a new User
exports.register = (req, res) => {
  let passwordTest = isValid(req.body.password);
    // Validate request
  if (!req.body.pseudo) {
    res.status(400).send({
      message: "Le pseudo ne peut être nul" 
    });
    return;
  } else if (!req.body.email) {
      res.status(400).send({
        message: "L'email ne peut être nul"
      });
      return 0;
      }else if (!passwordTest) {
          res.status(400).send({
            message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre !"
          });
          return 0;
      }
  console.log(req.body.admin);
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      pseudo: req.body.pseudo,
      email: req.body.email,
      hash: hash,
      admin: req.body.admin,
    });
      // Save User in the database
    User.signUp(user, (err, resultat) => {
      if (err) {
        res.status(500).send({
        message: "L'email existe déja."
        });
      }
      const id_user = resultat.id_user;
      const token = jwt.sign(
        { id_user: id_user },
        process.env.SECRET,
        { expiresIn: '24h' }
      );
      res.status(200).json({
        id_user: id_user,
        token: token,
        admin: resultat.admin,
      });
  });
})
}

exports.login = async (req, result) => {
  const { email, password } = req.body;
  User.signIn(email, (err, res) => {
    if (res == null) {
      console.log("error: ", err);
      result.status(400).send({
        message: "L'email n'existe pas." 
      });
      return;
    }
    console.log(res);
    bcrypt.compare(password, res.hash)
      .then(valid => {
        if (!valid) {
          return result.status(401).json({ message: 'Mot de passe incorrect !' });
        }
        console.log("Utilisateur trouvé: ", res.id_user);
        const id_user = res.id_user;
        const isAdmin = res.admin;
        const token = jwt.sign(
          { id_user: id_user },
          process.env.SECRET,
          { expiresIn: '24h' }
        );
        console.log(token);
      result.status(200).send({
      message: "L'utilisateur est bien connecté!",
      token: token,
      id_user: id_user,
      isAdmin: isAdmin,
      });
      
  })

})
}

module.exports.logout = (req, res) => {
  //res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}