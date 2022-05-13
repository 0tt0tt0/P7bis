
module.exports = app => {
    const posts = require("../controllers/post.controller.js");
    var router = require("express").Router();
    const multer = require('../middleware/multer-config');
    //const auth = require('../middleware/auth');
    // Create a new post
    router.post("/create",multer, posts.create);
    // Retrieve all posts
    router.get("/getAll", posts.findAllPublished);
    // Update a post with id
    router.put("/:id",multer, posts.update);
    // Delete a post with id
    router.delete("/:id", posts.delete);
    // Delete all posts
    router.delete("/", posts.deleteAll);
    app.use('/api/posts', router);   
};