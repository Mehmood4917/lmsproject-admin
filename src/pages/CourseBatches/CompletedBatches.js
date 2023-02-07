import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { MdModeEdit, MdDelete } from "react-icons/md"
import Table from '../../components/Table'
import instance from '../../services'
import { useHistory } from 'react-router'
function CompletedBatches() {

    const history = useHistory()
    const [Cbatch, setCbatch] = useState([])


    useEffect(() => {
        completedBatch()
    }, [])

    const completedBatch = async () => {
        try {
            const res = await instance.get('/admin/CompletedCourseBatches')
            console.log('completed batch res', res.data)
            setCbatch(res.data)
        }
        catch (e) {
            console.log(e)
        }
    }

    const head = [
        {
            headerName: 'Title',
            field: '',
            onRender: (q) => {
                return (
                    <p className="text-green-500 cursor-pointer" onClick={() => { history.push(`/admin/coursebatches/add-batch/${q._id}`) }}>{q.batch_id}</p>
                )
            }
        },
        {
            headerName: 'Created Date',
            field: '',
            onRender: (q) => {
                return (
                    <p >{dayjs(q.createdDate).format('DD MMMM YYYY')}</p>
                )
            }
        },
        {
            headerName: 'Started Date',
            field: '',
            onRender: (q) => {
                return (
                    <p >{dayjs(q.startDate).format('DD MMMM YYYY')}</p>
                )
            }

        },
        {
            headerName: 'Students Registered',
            field: '',
            onRender: (q) => {
                return (
                    <p className="text-center">{q.studentsCount}</p>
                )
            }
        },
        {
            headerName: 'Timing',
            field: '',
            onRender: (q) => {
                return (
                    <p >{`${q.startTime} TO ${q.endTime}`}</p>
                )
            }

        },

        {
            headerName: 'End Date',
            field: '',
            onRender: (q) => {
                return (
                    <p >{dayjs(q.endDate).format('DD MMMM YYYY')}</p>
                )
            }
        },
        {
            headerName: 'Action',
            field: '',
            onRender: (q) => {
                return (
                    <div className="flex divide-x-2 divide-black  ">

                        <span className="cursor-pointer" > {<MdModeEdit size='1.25rem' />}</span>
                    </div>
                )
            }
        }
    ]
    return (
        <div className=" flex flex-col items-center -mt-16 px-20 " >
            <div className="  bg-white w-full p-5 rounded  rounded-b-none    ">
                <h1 className="font-bold">Courses Table</h1>
            </div>
            <div className=" w-full border border-t-0 bg-white shadow-xl ">
                <Table headers={head} data={Cbatch} items={Cbatch.length} />
            </div>
        </div>
    )
}

export default CompletedBatches
