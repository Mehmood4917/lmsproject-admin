import React, { lazy } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import PrivateRoute from "../../components/PrivateRoute";
import Table from "../../components/Table";

const UsersComponent = lazy(() => import("../Users/Users"));
const InstructorComponent = lazy(() => import("../Instructors/Instructors"));
const CourseComponent = lazy(() => import("../Courses/Courses"));
const CourseBatches = lazy(() => import("../CourseBatches/CourseBatches"));
const Assessments = lazy(() => import("../Assessment/Assessments"));
const Admin = () => {
  return (
   
      <div className="flex overflow-y-scroll">
        <div className=" w-96   h-screen  bg-navbg overflow-y-scroll shadow-lg ">
          <Navbar />
        </div>
        <div className=" w-full  h-screen ">
          <Header />
         
            <PrivateRoute path="/admin/users" component={UsersComponent} />
            <PrivateRoute
              path="/admin/instructors"
              component={InstructorComponent}
            />
            <PrivateRoute path="/admin/courses" component={CourseComponent} />
            <PrivateRoute
              path="/admin/coursebatches"
              component={CourseBatches}
            />
            <PrivateRoute path="/admin/assessments" component={Assessments} />
         
        </div>
      </div>
    
  );
};

export default Admin;
