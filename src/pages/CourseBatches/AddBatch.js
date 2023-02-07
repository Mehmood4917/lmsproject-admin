import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import instance from '../../services'
import { useFormValidation } from '../Auth/useFormValidation'
import { MdKeyboardArrowDown } from "react-icons/md";
import { TimePicker } from 'antd';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import Table from '../../components/Table'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import { MdDelete } from "react-icons/md"
function AddBatch({ match }) {
    // console.log('match:', match)
    const id = match.params.id
    const [show, Setshow] = useState(false)
    const [allinstructor, setallinstructor] = useState()
    const [allCourses, setallCourses] = useState()
    const [details, setdetails] = useState()
    const [pageNo, setpageNo] = useState(0)
    const [pageSize, setpageSize] = useState(0)
    const [isBackend, setisBackend] = useState(false)

    const [suspend, setsuspend] = useState()
    const [toggle, settoggle] = useState('')
    const [deleted, setdeleted] = useState('')
    const [Total, setTotal] = useState()
    const [students, setstudents] = useState([])

    const getAllInstructors = async () => {
        try {
            const res = await instance.get('/admin/allInstructors')
            setallinstructor(res.data)
            //console.log('All Instructors:', res.data)
        }
        catch (e) {
            console.log(e)
        }
    }

    const getAllCourses = async () => {

        try {
            const res = await instance.get('/admin/allCourses')
            // console.log("all courses:", res.data)
            setallCourses(res.data)

        }
        catch (e) {
            console.log(e)
        }
    }

    const detailsbyid = async () => {
        try {
            const res = await instance.post('/admin/getBatchDetailById', { id: id, page: pageNo, size: pageSize })
            console.log("details res", res.data.total)
            setdetails(res.data.data)
            setstudents(res.data.data.students)
            setTotal(res.data.total)
            setValues(res.data.data)

            if (res.data?.total) {
                setisBackend(true)
            }
        }
        catch (e) {
            console.log(e)
        }
    }







    // useEffect(()=>{
    //     if(id){
    //     details()
    //     }
    // },[id])

    // console.log('get courses', allCourses)
    // console.log('get instructor', allinstructor)


    const head = [
        {
            headerName: 'Name',
            field: '',
            onRender: (q) => {
                return (
                    <p>{`${q.firstname} ${q.lastname}`}</p>
                )
            }
        },
        {
            headerName: 'Email',
            field: 'email'
        },
        {
            headerName: 'Suspend user',
            field: '',
            onRender: (q) => {
                return (
                    <div className="  text-pink-500  " onClick={() => { triggerToggel(q) }}   >
                        {q.isSuspended ? <BsToggleOn className="cursor-pointer " size='2rem' /> : <BsToggleOff className="cursor-pointer " size='2rem' />}
                    </div>)
            }
        },
        {
            headerName: 'Action',
            field: '',
            onRender: (q) => {
                return (
                    <div className="text-pink-500  pl-2">
                        {<MdDelete onClick={() => { triggerDelete(q) }} className="cursor-pointer " size='1.5rem' />}
                    </div>
                )
            }

        }
    ]


    const sizeperpage = (p) => {
        console.log(p, "page in afdbatch")
        setpageSize(p)
    }

    const pageNoSize = (s) => { setpageNo(s) }



    console.log('suspend:', suspend)
    const triggerToggel = async (q) => {
        console.log('q:', q.isSuspended)
        try {
            const res = await instance.post('/admin/suspendUser', { isSuspended: !q.isSuspended, id: q._id })
            settoggle(res.data)
            console.log("res ;", res)
            setsuspend(!q.isSuspended)
        }
        catch (e) {
            console.log(e)
        }
    }
    const triggerDelete = async (q) => {
        try {
            const res = await instance.delete(`/admin/deleteProgress/${q.batchId}`)
            setdeleted(res)
            console.log("deleted res:", res)
        }
        catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {

        if (id) {
            detailsbyid()
        } else {
            getAllCourses()
            getAllInstructors()
        }

    }, [pageNo, pageSize, suspend, deleted])

    const submit = async () => {
        try {
            const res = await instance.post('', { ...data })
        }
        catch (error) {
            console.log(error.message)
        }
    }
    const { data, errors, handleChange, handleSubmit, setValues } = useFormValidation({
        initialValue: {
            course: '',
            starttime: '',
            endtime: '',
            startdate: '',
            enddate: '',
            instructor: '',
            skilllevel: ''
        },
        validationSchema: {
            course: {
                required: {
                    value: true,
                    message: "course is a required",
                },
            },
            starttime: {
                required: {
                    value: true,
                    message: "starttime is a required",
                },
            },
            endtime: {
                required: {
                    value: true,
                    message: "endtime is a required",
                },
            },
            startdate: {
                required: {
                    value: true,
                    message: "startdate is a required",
                },
            },
            enddate: {
                required: {
                    value: true,
                    message: "enddate is a required",
                },
            },
            instructor: {
                required: {
                    value: true,
                    message: "instructor is a required",
                },
            },

        },
        submit: submit
    })









    return (
        <div  >



            <div className=" flex flex-col items-center -mt-16 ">
                <div className="  bg-white w-3/5 p-5 rounded  rounded-b-none    ">
                    <h1 className="font-bold">Add Batch</h1>
                </div>



                <div className="  py-8 px-10 w-3/5 w-2/5 border border-t-0 bg-gray-100 shadow-xl">

                    <form onSubmit={handleSubmit}>

                        <div className="mt-5">
                            <label className="font-base text-lg ">Course:</label>
                            <input
                                type="text"
                                onChange={handleChange('course')}
                                className={errors && errors.course ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg '}
                                placeholder="course name"
                            />

                        </div>

                        <div className="mt-5">
                            <label className="font-base text-lg">Start Time:</label>
                            <TimePicker
                                className={errors && errors.starttime ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg " : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg '}
                                onChange={handleChange('starttime')}
                                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />

                        </div>
                        <div className="mt-5">
                            <label className="font-base text-lg">End Time:</label>
                            <TimePicker

                                className={errors && errors.starttime ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg " : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg '}
                                onChange={handleChange('starttime')}
                                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                        </div>
                        <div className="mt-5">
                            <label className="font-base text-lg">Start Date:</label>
                            <DatePicker
                                className={errors && errors.starttime ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg " : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg '}
                            />
                        </div>
                        <div className="mt-5">
                            <label className="font-base text-lg">End Date:</label>
                            <DatePicker
                                selected={moment()}
                                className={errors && errors.starttime ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg " : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg '}
                            />
                        </div>
                        <div className="text-lg  py-2 text-gray-500  ">
                            <h2>Status:</h2>
                            <label className="px-2 "> <input className="h-4 w-4" type="radio" name="status" /> Yet to start</label>
                            <label className="px-2"> <input className="h-4 w-4" type="radio" name="status" /> Ongoing</label>
                            <label className="px-2"> <input className="h-4 w-4" type="radio" name="status" /> On Hold</label>
                            <label className="px-2"> <input className="h-4 w-4" type="radio" name="status" /> Completed</label>

                        </div>

                        <div className="mt-5">
                            <label className="font-base text-lg">Instructor:</label>
                            <input
                                className={errors && errors.instructor ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg " : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg'}
                                type="text"
                                // value={data.instructor.name}
                                onChange={handleChange('instructor')}
                                onClick={() => (Setshow(!show))}
                                placeholder="Instructor name" />
                            {show &&
                                <div className="bg-white text-lg font-normal h-40 overflow-y-scroll py-2  ">
                                    {allinstructor.map((item) => (
                                        <h1 className="hover:bg-gray-100 cursor-pointer p-2 "

                                            onClick={() => {
                                                setValues({ ...data, instructor: item });
                                                Setshow(false)
                                            }}
                                        >{item.username}</h1>
                                    ))}
                                </div>
                            }
                        </div>

                        <div className="flex justify-end">
                            <p className="bg-blue-500 text-white mt-5 px-5 py-3 rounded  cursor-pointer">+ Add Student</p>
                            </div>
                        {/* 

                        <input
                            className='w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8 '
                            type="text"
                            placeholder="Filter" /> */}

                        <div className="mt-10">

                            <Table className="mt-8" headers={head} data={students} sizeperpage={sizeperpage} pageNoSize={pageNoSize} items={Total} isBackend={isBackend} />
                        </div>
                        
                        <button type="submit" className="bg-blue-500 text-white mt-5 px-5 py-3 rounded float-right">Save</button>

                    </form>
                </div >


            </div >

        </div >
    )
}

export default AddBatch


