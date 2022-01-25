const fs = require('fs');

const dirPath='./data';
const filePath='./data/data.json';

const loadData = ()=>{
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
    }

    if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath,'[]','utf-8');
    }

    const buffer =fs.readFileSync(filePath,'utf-8');

    return buffer;
}

module.exports={
    signInForm(req,res){
        res.render('signin',{
            layout:'mainLayout',
            title:'SignIn',
            msg:'',
            logged:false,
        });
    },
    signIn(req, res){
        
        const load  = loadData();
        const datas = JSON.parse(load); 
        let username = req.body.username;
        let password = req.body.password;

        const findData = datas.find((data)=> data.password==password);

        if(!findData){
            res.render('signin',{
                layout:'mainLayout',
                title:'SignIn',
                msg:'<b>Password yang anda inputkan salah</b>',
                logged:false,
            });
        }else{
            res.redirect('/');
        }
    },
    signUpForm(req, res){
        res.render('signup',{
            layout:'mainLayout',
            title:'SignIn',
            msg:'',
            logged:false,
        });
    },
    signUp(req, res){
        const load  = loadData();
        const datas = JSON.parse(load); 
        let username = req.body.username;
        let password = req.body.password;

        // create/write data to array
        const data ={
            username,
            password
        };

        const duplicate=datas.find((data)=>data.username===username);
        
        if(duplicate){
            res.render('signup',{
                layout:'mainLayout',
                title:'SignIn',
                msg:'email yang anda inputkan sudah terdaftar',
                logged:false, 
            })
        }else{
            console.log(data);
            datas.push(data);
            fs.writeFileSync(filePath,JSON.stringify(datas),'utf-8');

            res.redirect('/login');
        }
           
    }
};