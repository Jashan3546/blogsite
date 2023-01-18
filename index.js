const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const bodyparser = require('body-parser');
const authrouter = require('./routers/user');
const commentrouter = require('./routers/comments');
const blogrouter = require('./routers/blogs');
const session = require("express-session");
const passport = require('passport');
const passportLocal = require('./config/passport_local_stratigy');
const cookieparser = require("cookie-parser");
const mongostore = require("connect-mongo")(session);
const flash = require('connect-flash');
const customMware = require('./config/middlewares');
const expresslayouts = require("express-ejs-layouts")




const cors = require('cors');

const app = express();




app.use(bodyparser.json());
app.use(cookieparser())
app.use(expresslayouts)
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set('view engine', "ejs");
app.set("views", './views');



app.use(session({
    name: "blogsite",
    secret: "jashan",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new mongostore({
        mongooseConnection: db,
        autoRemove: "disabled"
    },
        (err) => {
            console.log(err || "connect mongo setup ok");
        })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setflash)

app.use('/auth', authrouter);
app.use('/comment', commentrouter);
app.use('/blog', blogrouter);



app.listen(3000, () => {
    console.log('listning on port 3000');
})





