module.exports = app => {
    // const authController = require("../controllers/auth.controller.js");
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    const auth = require('../middleware/auth');

    // auth
    router.post("/register/admin", users.checkAdmin);
    router.post("/register", users.register);
    router.post("/login", users.login);

    // Update an user password
    router.put("/password", auth, users.updatePassword);
    // Update an user pseudo
    router.put("/pseudo", auth, users.updatePseudo);
    // Delete an user
    router.delete("/",auth, users.delete);
    // Retrieve a single user with id
    router.get("/one", auth, users.findOne);

    app.use('/api/users', router);   
};