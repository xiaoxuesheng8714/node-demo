const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const bodyParser = require("body-parser");

// 引入users.js
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");

//DB config
const db = require("./config/keys").mongoURI;

//使用bodyparser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



// connect to mongodb
mongoose.connect(db)
        .then(() => console.log("mongodb connected"))
        .catch(err => console.log(err));

//passport初始化
app.use(passport.initialize());

require("./config/passport")(passport);


// app.get("/",(req,res) => {
//     res.send("hello world");
// })

//使用routes
app.use("/api/users",users);
app.use("/api/profile",profile);


const port = process.env.PORT || 5000;


app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})