const path = require('path')
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const methodoverride = require('method-override');


const app = express()
app.use(express.static(__dirname + '/public'))
app.use(methodoverride('_method'))
app.use(bodyParser.urlencoded({extended: true}));


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
})


app.listen(4000, () => {
    console.log('Server is up on port 4000.')
})
