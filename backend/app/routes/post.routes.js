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

    //POSSIBLE IMPROVES

    // Update a post with id
    // router.put("/:id",multer, posts.update);

    // Delete all posts
    // router.delete("/", posts.deleteAll);
    app.use('/api/posts', router);   
};