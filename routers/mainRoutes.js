const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('index', {title: 'Kursy'})
})

router.get('/course/:courseId', (req, res) => {
    res.render('course', {title: 'Kurs', courseId: req.params.courseId})
})

router.get('/coursesByCategory/:category', (req, res) => {
    res.render('coursesByCategory', {title: 'Kursy według kategorii', category: req.params.category})
})

router.get('/search', (req, res) => {
    res.render('search', {title: 'Wyszukiwanie kursów', search: req.query.search})
})

module.exports = router