import React, { useState, useEffect } from 'react'
import Table from '../../components/Table'
import instance from '../../services'

import { MdModeEdit, MdDelete } from "react-icons/md"
import { useHistory } from 'react-router'

function AllInstructors() {
    const history = useHistory()
    const [instructor, setinstructor] = useState([])
    const [deleted, setdeleted] = useState()


    const allInstructor = async () => {
        try {
            const res = await instance.get('/admin/allInstructors')
            // console.log("All instructor", res.data)

            setinstructor(res.data)

        }
        catch (e) {
            console.log(e)
        }
    }

    //console.log("instructors:", instructor)



    const head = [
        {
            headerName: 'Username',
            field: 'username'
        },
        {
            headerName: 'Email Address',
            field: 'email'
        },
        {
            headerName: 'Action',
            field: '',
            onRender: (q) => {
                return (
                    <div className="flex divide-x-2 divide-black  ">

                        <span className="cursor-pointer" onClick={() => { history.push(`/admin/instructors/add-instructor/${q._id}`) }}> {<MdModeEdit size='1.25rem' />}</span>
                        <span className="text-pink-500 cursor-pointer" onClick={() => { triggerDelete(q) }}> {<MdDelete size='1.5rem' />}</span>
                    </div>
                )
            }
        }
    ]


    //delete
    const triggerDelete = async (q) => {
        try {
            const res = await instance.delete(`/admin/deleteInstructor/${q._id}`)
            setdeleted(res)
            console.log("deleted res:", res)
        }
        catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        allInstructor()
    }, [deleted])

    return (
        <div className=" flex flex-col items-center -mt-16 px-20 " >
            <div className="  bg-white w-full p-5 rounded  rounded-b-none    ">
                <h1 className="font-bold"> All Instructors </h1>
            </div>

            <div className=" w-full border border-t-0 bg-white shadow-xl ">
                <Table headers={head} data={instructor} items={instructor.length} />
            </div>
        </div >
    )
}

export default AllInstructors
