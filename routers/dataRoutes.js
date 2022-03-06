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

/********** get course by given @id **********/
router.post('/get_course', coursesServices.getCourse)

/************** get categories **************/
router.post('/get_categories', coursesServices.getCategories)

/*** returns courses by given category ********
 * req.body:
 * @category : category of courses
 * *******************************************/
router.post('/get_courses_by_category', coursesServices.getCoursesByCategory)

module.exports = router