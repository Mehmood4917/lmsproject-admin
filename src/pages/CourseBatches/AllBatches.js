import React, { useState, useEffect } from 'react'
import Table from '../../components/Table'
import instance from '../../services'
import { MdModeEdit, MdDelete } from "react-icons/md"
import dayjs from 'dayjs'
import { useHistory } from 'react-router'
function AllBatches() {
const history=useHistory()
    const [batch, setbatch] = useState([])
    const [total, settotal] = useState(0)
    const [pageNo, setpageNo] = useState(0)
    const [pageSize, setpageSize] = useState(0);
    const [isBackend,setisBackend] = useState(false)


    useEffect(() => {
        allCourses()
    }, [pageSize, pageNo])

    const allCourses = async () => {
        try {
            const res = await instance.post('/admin/allCourseBatches', { page: pageNo, size: pageSize })
            //console.log("All Courses", res.data)

            setbatch(res.data.data)
            settotal(res.data.total)
            setisBackend(true)
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
                return(
                <p >{dayjs(q.createdDate).format('DD MMMM YYYY')}</p>
                )
            }
        },
        {
            headerName: 'Started Date',
            field: '',
            onRender: (q) => {
                return(
                <p >{dayjs(q.startDate).format('DD MMMM YYYY')}</p>
                )
            }
            
        },
        {
            headerName: 'Students Registered',
            field: '',
            onRender: (q) => {
                return(
                <p className="text-center">{q.studentsCount}</p>
                )
            }
        },
        {
            headerName: 'Timing',
            field: '',
            onRender: (q) => {
                return(
                <p >{`${q.startTime} TO ${q.endTime}`}</p>
                )
            }
            
        },
        {
            headerName: 'Status',
            field: 'status'
        },
        {
            headerName: 'End Date',
            field: '',
            onRender: (q) => {
                return(
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


    
  const sizeperpage = (p) => {
    // console.log("p:",p)
    setpageSize(p)
    // console.log('p1:',pageno)

  }

  const pageNoSize = (s) => {
    setpageNo(s)
    console.log('s:', pageNo)
  }




    return (

        <div className=" flex flex-col items-center -mt-16 px-20 " >
            <div className="  bg-white w-full p-5 rounded  rounded-b-none    ">
                <h1 className="font-bold"> Batches  </h1>
            </div>
            <div className=" w-full border border-t-0 bg-white shadow-xl ">
                <Table headers={head} data={batch} sizeperpage={sizeperpage} pageNoSize={pageNoSize}  items={total} isBackend={isBackend} />
            </div>
        </div>
    )
}

export default AllBatches

