import React, { lazy } from 'react'
import PrivateRoute from '../../components/PrivateRoute'

const AddCourseComponent =lazy(()=>import("./AddCourse"))
const AllCoursesComponent =lazy(()=>import('./AllCourses'))
const Courses=()=> {
    return (
        <>
        <PrivateRoute path="/admin/courses/add-course" exact component={AddCourseComponent}/>
        <PrivateRoute path="/admin/courses/add-course/:id" component={AddCourseComponent}/>
        <PrivateRoute path="/admin/courses/all-courses" component={AllCoursesComponent}/>
        </>
    )
}

export default Courses
