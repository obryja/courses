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
    role: {
        type: String, 
        require: true
    },
    courses: [ObjectId]
}, {
    versionKey: false
})

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true,
        unique: true
    }
}, {
    versionKey: false
})

const Course = new mongoose.model('Course', courseSchema)
const User = new mongoose.model('User', userSchema)
const RefreshToken = new mongoose.model("RefreshToken", refreshTokenSchema)

module.exports = {
    Course,
    User,
    RefreshToken,
}