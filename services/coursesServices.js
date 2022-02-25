const Course = require('../db/schemas').Course

/** @sends : all saved courses from database */

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


/** adding data */

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
                img: req.body.img,  

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
}