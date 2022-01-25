const mongoose= require('mongoose');

//membuat schema
const bookCatalogue =mongoose.model('bookCatalogue',{
    judul:String,
    author:String,
});

//menambahkan data
// const catalog = new bookCatalogue({
//     judul:"Laskar Pelangi",
//     author:'Andrea Hirata'
// });

module.exports=bookCatalogue;