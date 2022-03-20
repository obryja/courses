const express = require('express')
const router = express.Router()
const ROLES_LIST = require('../loaders/roles').ROLES_LIST
const services = require('../services/adminServices')
const tokenServices = require('../services/tokenServices')

/********************** POST **********************/
/** req.body:
 * @username : username
 * @password : password */
 router.post("/login", services.authenticateUser, services.login)

 /** req.body:
  * @username : username
  * @password : password
  * @role : admin / user */
 router.post("/register", services.register, services.login)
 
 /** Data is retrieved from user's cookies 
  * @Deletes Refresh Token from database and user's cookies */
 router.post("/logout", tokenServices.deleteToken)


/********************** GET **********************/
/*************** login & register ***************/
router.get("/login", async(req, res) => {
    if(await tokenServices.checkRefreshToken(req.cookies.refreshToken))
        return res.redirect(307, "/")

    res.render("user/login", {title: "Logowanie"})
})

router.get("/register", async(req, res) => {
    if(await tokenServices.checkRefreshToken(req.cookies.refreshToken))
        return res.redirect(307, "/")

    res.render("user/register", {title: "Rejestracja"})
})

/******************** user ********************/
router.get('/user/:userId', tokenServices.checkLogged, services.verifyRoles(ROLES_LIST.user), (req, res) => {
    res.render('user/user', {title: 'Twoje kursy', userId: req.params.userId})
})

/******************* admin *******************/
router.get('/admin', tokenServices.checkLogged, services.verifyRoles(ROLES_LIST.admin), (req, res) => {
    res.render('admin/adminAdd',  {title: 'Dodawanie kursów'})
})

router.get('/admin/add', tokenServices.checkLogged, services.verifyRoles(ROLES_LIST.admin), (req, res) => {
    res.render('admin/adminAdd', {title: 'Dodawanie kursów'})
})

router.get('/admin/delete', tokenServices.checkLogged, services.verifyRoles(ROLES_LIST.admin), (req, res) => {
    res.render('admin/adminDelete', {title: 'Usuwanie kursów'})
})

router.get('/admin/update', tokenServices.checkLogged, services.verifyRoles(ROLES_LIST.admin), (req, res) => {
    res.render('admin/adminUpdate', {title: 'Modyfikowanie kursów'})
})

module.exports = router