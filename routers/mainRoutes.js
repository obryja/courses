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

router.get('/login', (req, res) => {
    res.render('user/login', {title: 'Logowanie'})
})

router.get('/register', (req, res) => {
    res.render('user/register', {title: 'Rejestracja'})
})

router.get('/user/:username', (req, res) => {
    res.render('user/user', {title: 'Twoje kursy', username: req.params.username})
})

module.exports = router