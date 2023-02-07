import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineSolution } from 'react-icons/ai';
import { ImUsers } from 'react-icons/im';

import { GrUserSettings } from 'react-icons/gr';
import {FaTasks} from 'react-icons/fa'

import Logo from '../images/amrutaLogo.png'

const sections = [
  {
    name: "Users",
    logo: <FaUserCircle size='1.5rem' />,
    children: [
      { name: "Add users", goto: "/admin/users/add-user" },
      { name: "All users", goto: "/admin/users/all-users" },
    ],
  },
  {
    name: "Instructors",
    logo: <GrUserSettings size='1.5rem' />,
    children: [
      { name: "Add Instructor", goto: "/admin/instructors/add-instructor" },
      { name: "All Instructors", goto: "/admin/instructors/all-instructors" },
    ],
  },
  {
    name: "Courses",
    logo: <AiOutlineSolution  size='1.5rem'/>,
    children: [
      { name: "Add Courses", goto: "/admin/courses/add-course" },
      { name: "All Courses", goto: "/admin/courses/all-courses" },
    ],
  },
  {
    name: "Course Batches",
    logo: <ImUsers  size='1.5rem' />,
    children: [
      { name: "Add Batch", goto: "/admin/coursebatches/add-batch" },
      { name: "All Batches", goto: "/admin/coursebatches/all-batches" },
      { name: "Completed Batches", goto: "/admin/coursebatches/completed-batch" },
    ],
  },
  {
    name: "Assessments",
    logo: <FaTasks   size='1.5rem'/>,
    children: [
      { name: "Add Assessment", goto: "/admin/assessments/add-assessment" },
      { name: "All Assessments", goto: "/admin/assessments/all-assessment" },
    ],
  },
];
const Navbar = () => {
  return (
    <div className="flex-col  ">
      <span className="flex items-center  mx-5 mt-10">
        <img className="" src={Logo} alt="logo" style={{ width: '220px' }} />
      </span>
      <br />
      <div className="bg-white-100 px-10 ">
        <ul className="">
          {sections.map((section, index) => {
            return (
              <li className="pl-1/10 py-1/10 font-sans text-lg  " key={index}>
                <div className="flex p-2">
                  <div className=" mr-2 " >{section.logo}</div>
                  <div className=" font-medium">{section.name}</div>
                </div>
                <ul>
                  {section.children.map((child, cI) => (
                    <li className=" pl-14 " key={cI}>
                    
                        
                      
                        <Link to={child.goto} className="  cursor-pointer text-sm font-sans  hover:text-gray-400">
                          <div className="py-3  text-normal font-lg"> {child.name}</div>
                        </Link>
                   
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
};
export default Navbar;
