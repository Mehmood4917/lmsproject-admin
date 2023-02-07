import React, { lazy } from 'react'
import PrivateRoute from '../../components/PrivateRoute'

const AddInstructorComponent =lazy(()=>import('./AddInstructor'))
const AllInstructorsComponent =lazy(()=>import('./AllInstructors'))

const  Instructor = () => {
    return (
        <>
        <PrivateRoute path="/admin/instructors/add-instructor" exact component={AddInstructorComponent} />
        <PrivateRoute path="/admin/instructors/add-instructor/:id" exact component={AddInstructorComponent} />
        <PrivateRoute path="/admin/instructors/all-instructors" component={AllInstructorsComponent} />
        </>
    )
}

export default Instructor
