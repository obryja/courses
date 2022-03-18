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

/********** delete course by given @id **********/
router.post('/delete_course', coursesServices.deleteCourse)

/*************** Updating course ***************
 * @id : id of course to update
 * @name : name (optional)
 * @description : description (optional)
 * @category : category (optional)
 * @length : length in hours (optional)
 * @price : price in PLN (default) (optional)
 * @img : img url (optional)
 * *********************************************/
router.post('/update_course', coursesServices.updateCourse)

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

/******************* search *******************
 * req.body:
 * @search : search
 * *******************************************/
 router.post('/search', coursesServices.searchCourses)

module.exports = router