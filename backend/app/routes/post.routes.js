module.exports = app => {
    const posts = require("../controllers/post.controller.js");
    var router = require("express").Router();
    const multer = require('../middleware/multer-config');
    const auth = require('../middleware/auth');

    // Create a new post
    router.post("/create",multer, auth, posts.create);
    // Retrieve all posts
    router.get("/getAll",auth, posts.findAllPublished);
    // Delete a post with id
    router.delete("/:id",auth, posts.delete);

    app.use('/api/posts', router);   
};