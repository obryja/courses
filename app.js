const app = require('./loaders/express')
const mainRouter = require('./routers/mainRoutes')
const adminRouter = require('./routers/adminRoutes')

app.use(mainRouter)
app.use(adminRouter)

/* errors */

app.use((req, res) => {
    res.status(404).render('errors/404', {title: '404'})
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).render('errors/500', {title: '500'})
})