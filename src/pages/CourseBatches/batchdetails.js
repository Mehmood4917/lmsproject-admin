import React from 'react'

function batchdetails() {

    const tab = [
        {
            name: 'Edit Batch Curriculum',
        },
        {
            name: 'Resources',
        },
        {
            name: 'Assignments',
        },
        {
            name: 'Projects',
        },
        {
            name: 'Live class',
        },
        {
            name: 'Recorded videos',
        },
        {
            name: 'Assessment',
        },
        {
            name: 'Feedbacks',
        },

    ]
    return (

        <div className=" flex flex-col items-center -mt-16 px-20 " >
            <div className="  bg-white w-full p-5 rounded  rounded-b-none    ">
                <h1 className="font-bold"> All Users </h1>
            </div>
            <div className="flex justify-around w-full border border-b-2 bg-gray-200 shadow-xl ">

                {
                    tab.map(i => {
                        return (
                            <h1 className="font-medium p-4 cursor-pointer">{i.name}</h1>
                        )
                    })
                }
            </div>



        </div>
    )
}

export default batchdetails
