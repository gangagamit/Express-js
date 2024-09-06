require("dotenv").config()
const express =  require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()
const port = process.env.port || 555;
const path = require('path');
const ejs = require('ejs');
const passport = require('passport');
const session = require('express-session');
require('./config/passportlocal');

app.set('view engine','ejs');

//connect to Database
// mongoose.connect('mongodb://127.0.0.1:27017/studentData')
// mongoose.connect("mongodb+srv://Ganga07:ganga%4044@cluster0.6bt4n.mongodb.net/Employee")
// mongoose.connect(process.env.MONGODB_URI)
// .then(()=> console.log('database connect successfully'))
// .catch(error=> console.log(error));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/public/images',express.static(path.join(__dirname,'public/images')))

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res)=>{
    res.render("registration.ejs");
});

app.get("/", (req, res)=>{
    res.render("login.ejs");
});


const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const cartRoutes =  require('./routes/cart.routes');

//todolist
const todoRoutes = require('./routes/Todo.routes');
const profileRoutes = require('./routes/profile.routes');

app.use('/api/product',productRoutes);
app.use('/api/user',userRoutes);
app.use('/api/cart',cartRoutes);
//todolist
app.use("/api/todoList", todoRoutes);
app.use("/api/profile", profileRoutes);

app.listen(port,()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log('database connect successfully'))
    .catch(error=> console.log(error));
    console.log(`start server at http://localhost:${port}`);
})








