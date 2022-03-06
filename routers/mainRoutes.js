const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('index', {title: 'Kursy'})
})

router.get('/course/:courseIndex', (req, res) => {
    res.render('course', {title: 'Kurs', courseIndex: req.params.courseIndex})
})

router.get('/coursesByCategory', (req, res) => {
    res.render('coursesByCategory', {title: 'Kursy według kategorii'})
})

module.exports = router