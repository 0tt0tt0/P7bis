module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    var router = require("express").Router();
    const auth = require('../middleware/auth');
    // Create a new comment
    router.post("/", comments.create);
    // Retrieve all comments for one post with id
    router.get("/:id", comments.findOnePostComments);
    // Retrieve all comments
    router.get("/", auth, comments.getAllComments);
    // Update a comment with id
    //router.put("/:id", comments.update);
    //Delete a comment with id
    router.delete("/:id", auth, comments.delete);
    app.use('/api/comments', router);   
}; 