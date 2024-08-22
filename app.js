const express =  require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');


//connect to Database
mongoose.connect('mongodb://127.0.0.1:27017/studentData')
// mongoose.connect("mongodb+srv://Ganga07:ganga%4044@cluster0.6bt4n.mongodb.net/Employee")
.then(()=> console.log('database connect successfully'))
.catch(error=> console.log(error));



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));



app.get('/',(req,res)=>{
    res.send('welcome to express js');
  
});
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/product',productRoutes);
app.use('/api/user',userRoutes);

app.listen(555,()=>{
    console.log('start server');
})




