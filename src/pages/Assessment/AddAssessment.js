import React, { useState, useEffect } from 'react'
import useFormArray from '../../components/useFormArray';
import { MdDelete } from "react-icons/md"
import { useFormValidation } from '../Auth/useFormValidation';
import instance from '../../services';

function AddAssessment({ match }) {


    const { data: formdata, addItem, removeItem } = useFormArray();



    const showChidItems = items => {
        return (
            <>
                {items && items.length > 0 && (
                    <div style={{ marginLeft: '15px' }}>
                        {items.map(w => (
                            <>
                                {/* <input value={w.name} /> */}
                                <div className="flex w-full border-b-2 border-gray-300   bg-gray-100 text-lg mt-8">
                                    <span> <input type="checkbox" className="m-2" /></span>
                                    <input
                                        type="text"

                                        className='w-full bg-gray-100 outline-none'
                                        placeholder="Option" />
                                    <span className="text-pink-500 float-right cursor-pointer " onClick={() => removeItem(w.id)}> {<MdDelete size='1.5rem' />}</span>

                                </div>
                                {/* <button onClick={() => removeItem(w.id)}>Delete</button> */}
                                {/* <button onClick={() => addItem({ name: '' }, w.id)}>
                                    Add Item
                                </button> */}
                                {/* <br /> */}
                                {/* {w.children &&
                                    w.children.length > 0 &&
                                    showChidItems(w.children)} */}
                            </>
                        ))}
                    </div>
                )}
            </>
        );
    };

    const id = match.params.id;

    console.log('ID:', id)
    useEffect(() => {
        if (id) {
            getAssessment();
        }
    }, [id])


    const getAssessment = async () => {
        try {
            const res = await instance.get(`/admin/getAssessmentById/${id}`)
            console.log('all assessment:', res.data)
            setValues(res.data)
        }
        catch (e) {
            console.log(e)
        }
    }

    const submit = async () => {
        try {
            if (id) {
                const res = await instance.put('/admin/updateAssessment', { ...data,assessmentId:id })
            }
            else {
                const res = await instance.post('/admin/addAssessment', { ...data })

            }

        }
        catch (e) {
            console.log(e)
        }
    }

    const { data, errors, handleChange, handleSubmit, setValues } = useFormValidation({
        initialValues: {
            name: '',
            assessment: '',
        },
        validationSchema: {
            name: {
                required: {
                    value: true,
                    message: "name is a required",
                },
            },
        },
        submit: submit
    })



    return (
        <>
            <div className=" flex flex-col items-center -mt-16 ">
                <div className="  bg-white w-3/5 p-5 rounded  rounded-b-none    ">
                    <h1 className="font-bold">Add Instructor</h1>
                </div>
                <div className="  py-8 px-10 w-3/5 w-2/5 border border-t-0 bg-gray-100">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            onChange={handleChange('name')}
                            value={data.name}
                            className={errors && errors.name ? "w-full border-b-2 border-red-500  outline-none bg-gray-100 text-lg mt-8" : 'w-full border-b-2 border-gray-300  outline-none bg-gray-100 text-lg mt-8'}
                            placeholder="Name" />

                        <button className="bg-white text-black font-medium px-5 py-2 mt-2 shadow-lg" onClick={() => addItem({ name: '' })}> + Add Question</button>
                        <br />
                        {formdata.map(q => (
                            <>
                                <div className="flex w-full border-b-2 border-gray-300   bg-gray-100 text-lg mt-8 ">
                                   

                                    <input
                                        type="text"
                                        className='w-full bg-gray-100 outline-none'
                                        placeholder="Question" />
                                    {<MdDelete className="text-pink-500 float-right cursor-pointer" onClick={() => removeItem(q.id)} size='1.5rem' />}
                                </div>


                                <button className="ml-5 bg-white text-black font-medium px-5 py-2 mt-2 shadow-lg border" onClick={() => addItem({ name: '' }, q.id)}> + Add Option</button>



                                {q.children && q.children.length > 0 && showChidItems(q.children)}
                            </>
                        ))}

                        <button type="submit" className="bg-blue-500 text-white mt-10 px-5 py-3 rounded float-right">Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddAssessment
