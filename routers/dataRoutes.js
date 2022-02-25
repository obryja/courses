const router = require('express').Router()
const coursesServices = require('../services/coursesServices')

/* POST methods */

/** Adding course
 * @name 
 * @description
 * @category
 * @length
 * @price
 * @img : img url */
router.post('/add_course', coursesServices.addCourse)

/* returns all courses from database */
router.post('/get_all_courses', coursesServices.getAllCourses)

module.exports = router