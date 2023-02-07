import React, { useState, useEffect } from 'react'
import Table from '../../components/Table'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import { MdModeEdit, MdDelete } from "react-icons/md"
import { useHistory } from 'react-router-dom'
import instance from '../../services'
import dayjs from 'dayjs'

const AllUsers = () => {
  const history = useHistory()

  const [deleted, setdeleted] = useState('')
  const [active, setactive] = useState()
  const [toggle, settoggle] = useState('')
  const [total, settotal] = useState('')
  const [user, setuser] = useState([])
  const [pageNo, setpageNo] = useState(0)
  const [pageSize, setpageSize] = useState(0);
  const [isBackend,setisBackend] = useState(false)


  const head = [
    {
      headerName: "fullname",
      field: 'firstname'
    },
    {
      headerName: "Email address",
      field: 'email'
    },
    {
      headerName: "Mobil number",
      field: 'phone'
    },
    {
      headerName: "Joined date",
      field: '',
      onRender: (q) => {
        return (
          <p >{dayjs(q.createdAt).format('DD MMMM YYYY')}</p>
        )
      }
    },
    {
      headerName: "Action",
      field: '',
      onRender: (q) => {
        return (
          <div className="flex divide-x-2 divide-black  ">
            <span className="cursor-pointer pr-2" onClick={() => { history.push(`/admin/users/add-user/${q._id}`) }}> {<MdModeEdit size='1.25rem' />}</span>
            <span className="text-pink-500 cursor-pointer pl-2" onClick={() => { triggerDelete(q) }}> {<MdDelete size='1.5rem' />}</span>
          </div>
        )
      }
    },
    {
      headerName: "Activate/Deactivate",
      field: '',
      onRender: (q) => {
        return (
          <div className=" mx-10 text-pink-500 cursor-pointer  " onClick={() => { triggerToggel(q) }} >
            {q.isActive ? <BsToggleOn size='2rem' /> : <BsToggleOff size='2rem' />}
          </div>)
      }
    },
  ]
  //fetching data from api

  const Users = async () => {
    try {
      const res = await instance.post("admin/allUsers", { page: pageNo, size: pageSize })
      console.log("all users--", res.data)
      setuser(res.data.data)
      settotal(res.data.total)
      console.log(res.data?.total)
        setisBackend(true)
    }
    catch (e) {
      console.log(e)
    }
  }

  const sizeperpage = (p) => { setpageSize(p) }

  const pageNoSize = (s) => { setpageNo(s) }

  //delete
  const triggerDelete = async (q) => {
    try {
      const res = await instance.delete(`admin/deleteUser/${q._id}`)
      setdeleted(res)
      console.log("deleted res:", res)
    }
    catch (e) {
      console.log(e)
    }
  }
  //toggle active/deactive
  const triggerToggel = async (q) => {
    console.log('q:', q.isActive)
    try {
      const res = await instance.put('/admin/updateUser', { isActive: !q.isActive, userId: q._id })
      settoggle(res.data)
      console.log("res ;", res)
      setactive(!q.isActive)
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    Users()
  }, [pageSize, pageNo, deleted, active])

  return (
    <div className=" flex flex-col items-center -mt-16 px-20 " >
      <div className="  bg-white w-full p-5 rounded  rounded-b-none    ">
        <h1 className="font-bold"> All Users </h1>
      </div>
      <div className=" w-full border border-t-0 bg-white shadow-xl ">
        <Table headers={head} data={user} sizeperpage={sizeperpage} pageNoSize={pageNoSize} items={total} isBackend={isBackend}/>
      </div>
    </div>
  )
}
export default AllUsers


