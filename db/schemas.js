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

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String, 
        require: true
    },
    admin: {
        type: Boolean,
        require: true
    },
    courses: [{courseId: String}]
}, {
    versionKey: false
})

const Course = new mongoose.model('Course', courseSchema)
const User = new mongoose.model('User', userSchema)

module.exports = {
    Course,
    User,
}