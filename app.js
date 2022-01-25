// init decration module
require('dotenv').config();
const express = require('express');
const logger  = require('morgan');
const path    = require('path');
const cookie  = require('cookie-parser');
const body    = require('body-parser');
const res     = require('express/lib/response');
const router  = require('./routes/index');
const session = require('express-session');
const flash   = require('connect-flash');

// client.connect((error,client)=>{
//     if(error){
//         return console.log(error);
//     }

//     console.log('Koneksi berhasil');
//     const db = client.db(dbName);

//     const dataBuku = db.collection('daftarBuku').find();
//     dataBuku.toArray((error,result)=>{
//         console.log(result)
//     });
// })
// decration app
const port =process.env.port || 3000;
const app = express();

// app.get('/test',(req,res)=>{
//     catalog.find().then((catalog)=>{
//         res.send(catalog);
//     });
// });

// setting app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

//setting view templating engine
app.set('views','./views');
app.set('view engine','ejs');

//setting cookie
app.use(cookie('secret'));
app.use(session({ 
    cookie:{maxAge:6000},
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());

//setting static file eccess
//for access static file like :
//css file, jquery, boostrap
app.use('/static',express.static(path.join(__dirname,'public'))); 

//setting cors config
app.use((req, res, next) => { //doesn't send response just adjusts it
    res.header("Access-Control-Allow-Origin", "*") //* to give access to any origin
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
        return res.status(200).json({});
    }
    next(); //so that other routes can take over
});

//setting router
app.use(router);

app.use((req,res)=>{
    res.status(400).send({
        status:false,
        message:'Page not found'
    })
});

app.listen(port,()=>{
    console.log(`Listening at http:localhost: ${port}`);
});