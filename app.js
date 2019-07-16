const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const methodoverride = require('method-override')
const sgMail = require('@sendgrid/mail')


const sgapi='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'
sgMail.setApiKey(sgapi)
const app = express()
app.use(express.static(__dirname + '/public'))
app.use(methodoverride('_method'))
app.use(bodyParser.urlencoded({extended: true}));
const port=process.env.PORT || 4000


mongoose.connect("mongodb://localhost/foodfunday",{ useNewUrlParser: true });
const foodschema=new mongoose.Schema({
    name:String,
    mail:String,
    contact:String,
    guests:Number,
    Date:String,
    Time:String,
    food:String,
    occatioin:String
})
const reservation=mongoose.model('reservation',foodschema)


app.get('/', (req, res) => {
    res.render("index.ejs")
})

// const mailid
app.post('/reservation',(req,res)=>{
    console.log(req.body);
    const reservme={
        name:req.body.form_name,
        mail:req.body.email,
        contact:req.body.phone,
        guests:req.body.no_of_persons,
        food:req.body.preferred_food,
        Date:req.body.datepicker,
        Time:req.body.timepicker,
        occatioin:req.body.occasion
    }
    reservation.create(reservme,(err,reserv)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(reserv);
        }
    })
    res.render('redirect.ejs');



//SENDING MAILS
    const mailid=(req.body.email).toString()
    console.log(mailid);
    sgMail.send({
    to:mailid,
    from:'jhaanand841@gmail.com',
    subject:'FoodFunday registration',
    text:'you are registered on foodfunday please do visit and enjoy your meal with the best chefs you will find on the planet '
    })
})

//setting up the port
app.listen(port, () => {
    console.log('Server is up on port '+ port +'.')
})
