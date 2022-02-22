const express = require('express')
const router = express.Router()

router.get('/admin', (req, res) => {
    res.render('admin/adminAdd', {title: 'Dodawanie kursów'})
})
router.get('/admin/add', (req, res) => {
    res.render('admin/adminAdd', {title: 'Dodawanie kursów'})
})

module.exports = router