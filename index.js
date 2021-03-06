const express=require('express');
const path= require('path');
const port=8000;
const db= require('./config/mongoose');
const contact = require('./models/contact');
const app=express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// // Middleware 1
// app.use(function(req, res, next){
//     req.myname="Namazi";
//     next();
// });

// // Middleware 2
// app.use(function(req, res, next){
//     console.log("From middleware2: ",req.myname);
//     next();
// });
var contactList=[
    {
        name: "Nia",
        phone: "1234567809"
    },
    {
        name: "kammo",
        phone: "1234567890"
    },
    {
        name: "Devil",
        phone: "1122882829"
    }
]

app.get('/',function(req,res){
    // console.log(__dirname);
    // res.send('<h1>Cool,it is running!</ h1>')
    // console.log("From homepage: ",req.myname);
    
    contact.find({},function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from DB');
            return;
        }
        return res.render('home',{
            title:"My Contact List ",
            contact_list: contacts
        });
    });
     
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);

    contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err, newContact){
        if(err){
            console.log('error in creating a contact!');
            return;
        }
        console.log('******',newContact);
        res.redirect('back');
    });
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // return res.redirect('/practice') 
});
// for Deleting the contact;
app.get('/delete-contact',function(req,res){
    // get the phone number from query
    // let phone = req.query.phone;
    // get the id from query
    let id=req.query.id;
    // find the contact with respective ID and delete
    contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting the object');
            return;
        }
        return res.redirect('back');
    })

    // let phone = req.params.phone;
});
app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "let us play"
    });
});

app.listen(port,function(err){
    if(err){
        console.log('Errorrrr',err);
    }
    console.log('Yea, Express Server is running on: ',port);
});