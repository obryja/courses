const { ObjectId } = require("bson")
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
    name: String,
    description: String,
    category: String,
    length: Number,
    price: Number,
    img: String,
}, {
    versionKey: false
})

const Course = new mongoose.model('Course', courseSchema)

module.exports = {
    Course,
}