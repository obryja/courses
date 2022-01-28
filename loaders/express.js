require('./mongoose')

const express = require('express')
const hbs = require("hbs")

const port = 3000
const app = express()

hbs.registerPartials('views/partials')
app.set('view engine', 'hbs')

app.use(express.static("public"))

app.listen(port)

module.exports = app