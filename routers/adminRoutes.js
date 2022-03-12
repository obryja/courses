const express = require('express')
const router = express.Router()

router.get('/admin', (req, res) => {
    res.render('admin/adminAdd', {title: 'Dodawanie kursów'})
})

router.get('/admin/add', (req, res) => {
    res.render('admin/adminAdd', {title: 'Dodawanie kursów'})
})

router.get('/admin/delete', (req, res) => {
    res.render('admin/adminDelete', {title: 'Usuwanie kursów'})
})

router.get('/admin/update', (req, res) => {
    res.render('admin/adminUpdate', {title: 'Modyfikowanie kursów'})
})

module.exports = router