const async = require('hbs/lib/async')
const Course = require('../db/schemas').Course

/***** all saved courses from database *****/

getAllCourses = async (req, res) => {
    try{
        res.status(202).send(JSON.stringify(
            await Course.find().lean()
        ))
    } catch(err){
        res.sendStatus(500)
        console.log(err)
    }
}

/********* get course by given @id *********/
getCourse = async (req, res) => {
    try {
        if(!req.body.id)  return res.sendStatus(400)

        res.status(202).send(JSON.stringify(
            await Course.findById(req.body.id).lean()
        ))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/******** select distinct categries ********/

getCategories = async (req, res) => {
    try{
        res.status(202).send(JSON.stringify(
            await Course.distinct('category').lean()
        ))
    }catch(err){
        res.sendStatus(500)
        console.log(err)
    }
}

/****** get courses by given @category ******/

getCoursesByCategory = async (req, res) => {
    try{
        res.status(202).send(JSON.stringify(
            await Course.find({category: req.body.category}).lean()
        ))
    } catch(err){
        res.sendStatus(500)
        console.log(err)
    }
}

/****************** search ******************/

searchCourses = async (req, res) => {
    try{
        var keyword = String(req.body.name) 
        res.status(202).send(JSON.stringify(
            await Course.find({name: { $regex: '.*' + keyword + '.*', $options: 'i'} }).lean()
        ))
    } catch(err){
        res.sendStatus(500)
        console.log(err)
    }
}

/************** adding course **************/

addCourse = async(req, res) => {
    try{
        if(!req.body.name || !req.body.category || !req.body.length || !req.body.price){
            return res.sendStatus(400)
        } else{
            const course = new Course({
                name: req.body.name,
                description: req.body.description || "Brak opisu",
                category: req.body.category,
                length: req.body.length,
                price: req.body.price,
                img: req.body.img || "/img/basic.png",  

            })
            await course.save()

            res.status(202).send(JSON.stringify(course))
        }
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/************* deleting course *************/

deleteCourse = async (req, res) => {
    try {
        if(!req.body.id)  return res.sendStatus(403)

        Course.deleteOne({_id: req.body.id}, err => {
            if(err) return res.sendStatus(400)
            
            res.sendStatus(202)
        })
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/************* update course *************/

updateCourse = async (req, res) => {
    try {
        if(!req.body.id)    return res.sendStatus(403)

        // try to find course with given id in database
        const course = await Course.findById(req.body.id)
        if(!course)  return res.sendStatus(404)

        // if one of the given data is falsy, corresponding value won't change
        course.name = req.body.name || course.name
        course.description = req.body.description || course.description
        course.category = req.body.category || course.category
        course.length = req.body.length || course.length
        course.price = req.body.price || course.price
        course.img = req.body.img || course.img

        await course.save()

        res.status(202).send(JSON.stringify(course))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

module.exports = {
    getAllCourses,
    getCourse,
    getCategories,
    getCoursesByCategory,
    searchCourses,
    addCourse,
    deleteCourse,
    updateCourse,
}