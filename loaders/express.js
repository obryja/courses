require('./mongoose')

const express = require('express')
const hbs = require("hbs")
const bp = require('body-parser')

const port = 3000
const app = express()

/*************** hbs settings ***************/

hbs.registerPartials('views/partials')
app.set('view engine', 'hbs')
app.use(express.static("public"))

/*************** bp settings ***************/

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.listen(port)

module.exports = app