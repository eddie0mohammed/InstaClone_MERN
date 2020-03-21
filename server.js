
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});


const authRouter = require('./routes/auth');



const app = express();



//DB
const DB = process.env.DB;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    console.log('successfully connected to DB');
})
.catch(err => {
    console.log(err);
});


//MIDDLEWARES
app.use(cors());

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());




//ROUTES

app.use('/auth', authRouter);










const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server listening on port ', PORT);
});