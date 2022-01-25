const mongoose= require('mongoose');

const uri    = 'mongodb://127.0.0.1:27017';
const dbName = 'perpusdb';

mongoose.connect('mongodb://localhost:27017/perpusdb',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});