const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const mongooseURI = require("./config/keys").mongoURI;

const profileRoutes = require("./routes/profile");
const usersRoutes = require("./routes/users");
const vacationsRoutes = require("./routes/vacations");

const app = express();

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/profile", profileRoutes);
app.use("/user", usersRoutes);
app.use("/vacation", vacationsRoutes);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(mongooseURI)
  .then(() => {
    const port = process.env.PORT || 5000;
    const server = app.listen(port, () => {
      console.log(`- Server running on port ${port}\n`);
    });
    console.log(`\n- Connected to VacationScanner db`);
    const io = require("./socket").init(server);
    io.on("connection", socket => {
      console.log("Client connected:", socket.id);
    });
  })
  .catch(err => console.log(`\n- Error connecting to database`, err));
