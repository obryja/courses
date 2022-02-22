const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('index', {title: 'Kursy'})
})

router.get('/course', (req, res) => {
    res.render('course', {title: 'Kurs'})
})

router.get('/coursesByCategory', (req, res) => {
    res.render('coursesByCategory', {title: 'Kursy według kategorii'})
})

module.exports = router