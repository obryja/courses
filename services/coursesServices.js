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

/*************** adding data ***************/

addCourse = async(req, res) => {
    try{
        if(!req.body.name || !req.body.category || !req.body.length || !req.body.price || !req.body.img){
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

module.exports = {
    addCourse,
    getAllCourses,
    getCourse,
    getCategories,
    getCoursesByCategory,
    searchCourses,
}