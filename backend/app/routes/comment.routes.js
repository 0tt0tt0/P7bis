module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    var router = require("express").Router();
    const auth = require('../middleware/auth');
    
    // Create a new comment
    router.post("/", comments.create);
    // Retrieve all comments
    router.get("/", auth, comments.getAllComments);
    //Delete a comment with id
    router.delete("/:id", auth, comments.delete);

    app.use('/api/comments', router);   
}; 