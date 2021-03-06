const bcryptjs = require('bcryptjs')
const { redirect } = require('express/lib/response')
const async = require('hbs/lib/async')
const jwt = require("jsonwebtoken")
const User = require('../db/schemas').User
const RefreshToken = require('../db/schemas').RefreshToken
const tokenServices = require("./tokenServices")

/**** checks if data is compatible with user in db ****/

authenticateUser = async (req, res, next) => {
    try {
        if (!req.body.username) return res.sendStatus(400)

        const user = await User.findOne({ username: req.body.username }).lean()

        // Check if user was found
        if (!user) return res.status(404).send()

        // Check if password matches
        if (!await bcryptjs.compare(req.body.password, user.password))
            return res.status(401).send()

        // user for login
        req.user = user
        next()
    } catch (err) {
        res.status(500).send()
        console.log(err)
    }
}

login = async (req, res) => {
    try {
        // return token to store and use for further access
        const accessToken = tokenServices.generateAccessToken(req.user)

        const refreshToken = jwt.sign(req.user, process.env.REFRESH_TOKEN_SECRET)

        // save new refresh token
        const saveToken = new RefreshToken({ token: refreshToken })
        await saveToken.save()

        // store refresh token and user data in cookies
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000  // 15 min
        })

        res.cookie("userInfo", {"username": req.user.username, "role": req.user.role}, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000  // 15 min
        })

        // send access token to client
        res.status(202).json(accessToken)
    } catch (err) {
        res.status(500).send()
        console.log(err)
    }
}

/****** check data and add new user to db with data ******/

register = async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.role) return res.sendStatus(401)
        // Check if send data is valid
        if (!validateRegistration(req.body)) return res.sendStatus(403)

        const user = await User.findOne({ username: req.body.username })

        // If there's already user with same username registered
        if (user) return res.sendStatus(404)

        // Hashing password
        const hashedPass = await bcryptjs.hash(req.body.password, 10)

        const newUser = new User({
            username: req.body.username,
            password: hashedPass,
            role: req.body.role,
        })
        await newUser.save()

        //user for login
        req.user = newUser.toJSON()

        next()

    } catch (err) {
        res.status(500).send()
        console.log(err)
    }
}

/****************** verify roles ******************/

verifyRoles = (allowedRole) => {
    return (req, res, next) => {
        if (!req.cookies.userInfo.role) return res.sendStatus(401)
        
        if (allowedRole == req.cookies.userInfo.role){
            return next()
        }
        else {
            res.redirect('/')
        }
    }
}

/*** check if data for registration is valid ***/
validateRegistration = data => {
    if (data.password.length < 6) return false

    return true
}

/****** get user by given @username ******/

getUser = async (req, res) => {
    try{
        res.status(202).send(JSON.stringify(
            await User.find({username: req.cookies.userInfo.username}).lean()
        ))
    } catch(err){
        res.sendStatus(500)
    }
}

/****************** purchase ******************/

purchase = async (req, res) => {
    try{
        if(!req.cookies.userInfo.username)    return res.sendStatus(403)
        if(!req.body.courseId)    return res.sendStatus(403)

        // try to find user with given username
        const user = await User.updateOne(
            {username: req.cookies.userInfo.username},
            {$addToSet: {courses: req.body.courseId}}
        )

        if(!user)  return res.sendStatus(404)

        //await user.save()

        res.status(202).send(JSON.stringify(user))
    } catch(err) {
        res.sendStatus(500)
    }
}

module.exports = {
    authenticateUser,
    login,
    register,
    verifyRoles,
    getUser,
    purchase,
}