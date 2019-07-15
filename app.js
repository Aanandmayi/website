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


// mongoose.connect("mongodb://localhost/foodfunday");
// const foodschema=new mongoose.Schema({
//     name:String,
//     mail:String,
//     contact:String,
//     guests:Number,
//     Date:Date,
//     Time:String,
//     food:String,
//     occatioin:String
// })
//
// const reservation=mongoose.model('reservation',foodschema)
//
// const reservation1={
//     name:"Anand",
//     mail:"anands@123",
//     contact:"58654984",
//     guests:5,
//     Date:12/12/1112,
//     Time:"4554",
//     food:"kopta",
//     occatioin:"marraige"
// }

// reservation.create(reservation1,(err,reserv)=>{
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(reserv);
//     }
// })




app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.post('/reservation',(req,res)=>{
    console.log(req.body);

})


app.listen(4000, () => {
    console.log('Server is up on port 4000.')
})
