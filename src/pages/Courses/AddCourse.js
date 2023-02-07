import React, { useState, useEffect } from 'react'
import instance from '../../services'
import { useFormValidation } from '../Auth/useFormValidation'

function AddCourse({ match }) {

    const id = match.params.id;

    const [page, setpage] = useState(1)


    useEffect(() => {
        if(id){
        getCourse();
        }
    }, [id])

    const getCourse = async () => {
        try {
            const res = await instance.get(`/admin/getCourseById/${id}`)
            console.log('all course:', res.data.basic)
            setValues(res.data.basic)
        }
        catch (e) {
            console.log(e)
        }
    }

    const submit = async () => {
        try {
            if (id) {
                const res = await instance.put('/admin/updateCourse', { ...data })
            } else {

                const res = await instance.post('/admin/addCourse', { ...data })
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }
    const { data, errors, handleChange, handleSubmit, setValues } = useFormValidation({
        initialValue: {
            title: '',
            mainDescription: '',
            imageURL: '',
            price: '',
            duration: '',
            prerequesties: '',
            skilllevel: ''
        },
        validationSchema: {
            title: {
                required: {
                    value: true,
                    message: "title is a required",
                },
            },
            mainDescription: {
                required: {
                    value: true,
                    message: "description is a required",
                },
            },
            imageURL: {
                required: {
                    value: true,
                    message: "imageURL is a required",
                },
            },
            price: {
                required: {
                    value: true,
                    message: "price is a required",
                },
            },
            duration: {
                required: {
                    value: true,
                    message: "duration is a required",
                },
            },
            prerequesties: {
                required: {
                    value: true,
                    message: "prerequesties is a required",
                },
            },
            skilllevel: {
                required: {
                    value: true,
                    message: "skilllevel is a required",
                },
            },
        },
        submit: submit
    })
    console.log(page)
    useEffect(() => {
        console.log('page', page)
    }, [page])
    return (
        <>

            <div className=" flex flex-col items-center -mt-16 ">
                <div className="  bg-white w-3/5 p-5 rounded  rounded-b-none    ">
                    <h1 className="font-bold">Add Course</h1>
                </div>


                <div className="  py-8 px-10 w-3/5 w-2/5 border border-t-0 bg-gray-100">
                    <form onSubmit={handleSubmit}>
                        {page === 1 &&
                            <>
                                <input
                                    type="text"
                                    onChange={handleChange('title')}
                                    value={data.title}
                                    className={errors && errors.title ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                                    placeholder="Title" />



                                <input
                                    className={errors && errors.mainDescription ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                                    type="text"
                                    value={data.mainDescription}
                                    onChange={handleChange('mainDescription')}
                                    placeholder="Description " />


                                <input
                                    className={errors && errors.imageURL ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                                    type="text"
                                    onChange={handleChange('imageURL')}
                                    value={data.imageURL}
                                    placeholder="ImageURL" />

                                <input
                                    className={errors && errors.price ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                                    type="text"
                                    onChange={handleChange('price')}
                                    value={data.price}
                                    placeholder="Price" />

                                <input
                                    className={errors && errors.duration ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                                    type="text"
                                    onChange={handleChange('duration')}
                                    value={data.duration}
                                    placeholder="Duration" />


                                <input
                                    className={errors && errors.prerequesties ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                                    type="text"
                                    onChange={handleChange('prerequesties')}
                                    value={data.prerequesties}
                                    placeholder="prerequesties" />

                                <input
                                    className={errors && errors.skilllevel ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                                    type="text"
                                    onChange={handleChange('skilllevel')}
                                    value={data.skilllevel}
                                    placeholder="Skill Level" />



                            </>
                        }

                        {page === 2 &&
                            <div>
                                <h1>Add Topic (curriculum)</h1>
                            </div>
                        }
                        {page === 3 &&
                            <div>
                                <h1>Add Faqs</h1>
                            </div>

                        }

                      
                        {page > 1 && <button type='submit'
                            className=" bg-blue-500 text-white mt-5 px-5 py-3 rounded float-left"
                            onClick={() => { page > 1 && setpage(page - 1) }}>previous</button>}

                        <div
                            className=" bg-blue-500 text-white mt-5 px-5 py-3 rounded float-right"
                            onClick={() => {!errors && page < 3 && setpage(page + 1) }} >
                            {page == 3 ? <button type='submit'>save</button> : <button >Next</button>}
                        </div>


                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCourse
