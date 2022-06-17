const express = require("express");
const cors = require("cors");
const app = express();
const db = require('./models');
const Role = db.role;

console.log(Role);
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to nodeJs application." });
});

require("./routes/tutorial.routes.js")(app);
require("./routes/auth.routes.js")(app);
require("./routes/user.router.js")(app);

// db.sequelize.sync(({force:true})).then(() => {
//     console.log("Drop & Resync DB");
//     initial();

// });
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial(){
  Role.create({
    id : 1,
    name : "admin"
  });

  Role.create({
    id : 2,
    name : "user"
  });
  
  Role.create({
    id : 3,
    name : "moderator"
  });
}



