const path = require('path')
const express = require('express')

const app = express()
app.use(express.static(__dirname + '/public'))






app.get('/', (req, res) => {
    res.render("index.ejs")
})






app.listen(4000, () => {
    console.log('Server is up on port 4000.')
})
