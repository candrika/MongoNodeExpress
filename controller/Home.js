// config mongo db
require('../utils/db');
const catalog = require('../model/perpus');

module.exports={
    async Index(req,res){
        const Catalog = await catalog.find();

        res.render('welcome',{
            title:'Home',
            layout:'mainLayout',
            catalog:Catalog,
            logged:false
        });

        console.log(Catalog);
    }
}