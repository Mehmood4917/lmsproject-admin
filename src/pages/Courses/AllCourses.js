import React, { useState, useEffect } from 'react'
import Table from '../../components/Table'
import instance from '../../services'

import { MdModeEdit, MdDelete } from "react-icons/md"
import { useHistory } from 'react-router'
function AllCourses() {
    const history = useHistory()
    const [courses, setcourses] = useState([])
    const [deleted, setdeleted] = useState()
    useEffect(() => {
        allCourses()
    }, [deleted])

    const allCourses = async () => {
        try {
            const res = await instance.get('/admin/allCourses')
            console.log("All Courses", res.data)

            setcourses(res.data)

        }
        catch (e) {
            console.log(e)
        }
    }


    const head = [
        {
            headerName: 'Title',
            field: 'title'
        },
        {
            headerName: 'Price',
            field: 'price'
        },
        {
            headerName: 'Action',
            field: '',
            onRender: (q) => {
                return (
                    <div className="flex divide-x-2 divide-black  ">

                        <span className="cursor-pointer" onClick={() => { history.push(`/admin/courses/add-course/${q._id}`) }}> {<MdModeEdit size='1.25rem' />}</span>
                        <span className="text-pink-500 cursor-pointer" onClick={() => { triggerDelete(q) }}> {<MdDelete size='1.5rem' />}</span>
                    </div>
                )
            }
        }
    ]

    const triggerDelete = async (q) => {
        try {
            const res = await instance.delete(`/admin/deleteCourse/${q._id}`)
            setdeleted(res)
            console.log("deleted res:", res)
        }
        catch (e) {
            console.log(e)
        }

    }


    return (

        <div className=" flex flex-col items-center -mt-16 px-20 " >
            <div className="  bg-white w-full p-5 rounded  rounded-b-none    ">
                <h1 className="font-bold">Courses Table</h1>
            </div>
            <div className=" w-full border border-t-0 bg-white shadow-xl ">
                <Table headers={head} data={courses} items={courses.length} />
            </div>
        </div>
    )
}

export default AllCourses

