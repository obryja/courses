const router = require('express').Router()
const coursesServices = require('../services/coursesServices')

/*************** POST methods ***************/

/*************** Adding course ***************
 * @name : name 
 * @description : description
 * @category : category
 * @length : length in hours
 * @price : price in PLN (default)
 * @img : img url 
 * *********************************************/
router.post('/add_course', coursesServices.addCourse)

/***** returns all courses from database *****/
router.post('/get_all_courses', coursesServices.getAllCourses)

module.exports = router