import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'
import instance from '../../services'
import { useFormValidation } from '../Auth/useFormValidation'

function AddInstructor({ match }) {

    const id = match.params.id
    //console.log('ID:', id)

    useEffect(() => {
        if (id) {

            getInstructor()
        }
    }, [id])

    const getInstructor = async () => {
        try {
            const res = await instance.get(`/admin/getInstructorById/${id}`)
            //    console.log("_id",res.data._id)
            setValues(res.data)

        }
        catch (e) {
            console.log(e)
        }
    }


    const submit = async () => {
        try {
            if (id) {
                const res = await instance.put('/admin/updateInstructor', { ...data, instructorId: id })
            }
            else {
                const res = await instance.post('/admin/addInstructor', { ...data })

            }

        }
        catch (e) {
            console.log(e)
        }
    }
    const { data, errors, handleChange, handleSubmit, setValues } = useFormValidation({
        initialValue: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: {
            username: {
                required: {
                    value: true,
                    message: "username is a required",
                },
            },
            email: {
                required: {
                    value: true,
                    message: "email is a required",
                },
            },
            password: {
                required: {
                    value: true,
                    message: "password is a required",
                },
            },

        },
        submit: submit
    })


    return (
        <div>

            <div className=" flex flex-col items-center -mt-16 ">
                <div className="  bg-white w-3/5 p-5 rounded  rounded-b-none    ">
                    <h1 className="font-bold">Add Instructor</h1>
                </div>



                <div className="  py-8 px-10 w-3/5 w-2/5 border border-t-0 bg-gray-100">

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={data.username}
                            onChange={handleChange('username')}
                            className={errors && errors.username ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                            placeholder="Username" />



                        <input
                            className={errors && errors.email ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                            type="text"
                            value={data.email}
                            onChange={handleChange('email')}
                            placeholder="Email address" />

                        {!id &&
                            < input
                                className={errors && errors.password ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                                type="text"
                                onChange={handleChange('password')}
                                placeholder="password" />
                        }

                        <button type="submit" className="bg-blue-500 text-white mt-5 px-5 py-3 rounded float-right">Save</button>

                    </form>
                </div>


            </div>

        </div>
    )
}

export default AddInstructor
