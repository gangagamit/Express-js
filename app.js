const express =  require('express');
const app = express();

const morgan = require('morgan');
const productRoutes = require('./routes/product.routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));



app.get('/',(req,res)=>{
    res.send('welcome to express js');
  
});

app.use('/api/product',productRoutes);

app.listen(155,()=>{
    console.log('start server');
})




