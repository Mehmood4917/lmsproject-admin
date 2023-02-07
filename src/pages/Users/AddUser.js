import React, { useState, useEffect } from 'react'
import instance from '../../services'
import { useFormValidation } from '../Auth/useFormValidation'

const AddUser = ({ match }) => {



    console.log("ID:", match.params.id);

    const id=match.params.id

    useEffect(() => {
        if(id){
        getUser()
        }
    }, [id])
    const getUser = async () => {
        try {
            const res = await instance.get(`admin/getUserById/${id}`)
            console.log('get user:', res.data.user)
            setValues(res.data.user)
        }
        catch (e) {
            console.log(e)
        }
    }

    const submit = async () => {
        try {
            if (id) {
                let res = await instance.put('/admin/updateUser', {...data,  userId: id })

                console.log("update res:", res.data)

            } else {
                const res = await instance.post('/student/create', { ...data })
                console.log("Register details", res)
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }


    const { data, errors, handleChange, handleSubmit, setValues } = useFormValidation({
        initialValue: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
        },
        validationSchema: {
            firstname: {
                required: {
                    value: true,
                    message: "firstname is a required",
                },
            },
            lastname: {
                required: {
                    value: true,
                    message: "lastname is a required",
                },
            },
            email: {
                required: {
                    value: true,
                    message: "email is a required",
                },
            },
            phone: {
                required: {
                    value: true,
                    message: "mobile no is a required",
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
                    <h1 className="font-bold">Add User</h1>
                </div>

                <div className="  py-8 px-10 w-3/5 w-2/5 border border-t-0 bg-gray-100">

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            onChange={handleChange('firstname')}
                            value={data.firstname}
                            className={errors && errors.firstname ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                            placeholder="First Name" />


                        <input
                            className={errors && errors.lastname ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                            type="text"
                            value={ data.lastname}
                            onChange={handleChange('lastname')}
                            placeholder="Last Name" />
                        {!id ?
                            <input
                                className={errors && errors.email ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                                type="text"
                                onChange={handleChange('email')}
                                placeholder="Email"
                            />
                            :
                            <input
                                className={errors && errors.email ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                                type="text"
                                value={data.email}
                                onChange={handleChange('email')}
                                placeholder="Email"
                                readOnly />

                        }
                        <input
                            className={errors && errors.phone ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                            type="text"
                            value={data.phone}
                            onChange={handleChange('phone')}
                            placeholder="Mobile No" />

                        {!id &&
                            <input
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

export default AddUser
