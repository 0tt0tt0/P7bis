const User = require("../models/user.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Function to check the password regex
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
// Register
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
        pseudo: resultat.pseudo,
        email: resultat.email,
      });
  });
})
}
//Login
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
    bcrypt.compare(password, res.hash)
      .then(valid => {
        if (!valid) {
          return result.status(401).json({ message: 'Mot de passe incorrect !' });
        }
        const id_user = res.id_user;
        const isAdmin = res.admin;
        const token = jwt.sign(
          { id_user: id_user },
          process.env.SECRET,
          { expiresIn: '24h' }
        );
      result.status(200).send({
      message: "L'utilisateur est bien connecté!",
      token: token,
      id_user: id_user,
      isAdmin: isAdmin,
      pseudo: res.pseudo,
      email: res.email,
      });
      
  })

})
}
// // Find a single User with a id
exports.findOne = (req, res) => {
  let token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const id = decodedToken.id_user;
    User.findById(id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Utilisateur non trouvé avec l'id ${id}.`
            });
          } else {
            res.status(500).send({
              message: "Erreur pour l'id " + id
            });
          }
        } else res.send(data);
    });
};
// Update a User Pseudo identified by the id in the request
exports.updatePseudo = (req, res) => {
  // Validate Request
  if (!req.body.pseudo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  let token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const id = decodedToken.id_user;
  User.updatePseudoById(id, req.body.pseudo, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + id
          });
        }
      } else res.send(data);
    }
  );
};
// Update a User Password identified by the id in the request
exports.updatePassword = (req, res) => {
  // Validate Request
  if (!req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  let passwordTest = isValid(req.body.password);
  if (!passwordTest) {
    res.status(400).send({
      message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre !"
    });
  }
  let token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const id = decodedToken.id_user;
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
  User.updatePasswordById(
    id,
    hash,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + id
          });
        }
      } else res.send(data);
    }
  );
  })
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  let token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const id = decodedToken.id_user;
    User.remove(id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete User with id " + id
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
      });
};
