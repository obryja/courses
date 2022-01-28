const router = require('express').Router()

const favicon = 'img/icon.png'

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Kursy',
        favicon: favicon
    })
})

module.exports = router