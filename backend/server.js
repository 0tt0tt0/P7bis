const express = require("express");
const bodyParser = require ("body-parser");
const cors = require("cors");
const app = express();
/*const cookieParser = require('cookie-parser');
app.use(cookieParser());*/
var corsOptions = {
  origin: '*'
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Groupomania application." });
});
require("./app/routes/user.routes.js")(app);
require("./app/routes/post.routes.js")(app);
require("./app/routes/comment.routes.js")(app);
require("./app/routes/like.routes.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
