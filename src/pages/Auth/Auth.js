import React, { useState } from 'react'
import Logo from "../../images/amrutaLogo.png"
import { useFormValidation } from "./useFormValidation"
import instance from "../../services/index"
import { useHistory } from 'react-router-dom'
const Auth = () => {
    const history = useHistory()
    const [dynamicErrors, setDynamicErrors] = useState(
        {
            email: "",
            password: ""
        }
    )
    const submit = async () => {
        setDynamicErrors({
            email: '',
            password: ''
        });
        try {
            const res = await instance.post("/admin/authenticate", { ...data })

            if(res && res.data){
                localStorage.setItem("token",res?.data.token)
            }
             history.push("/admin")
        }
        catch (error) {
            console.log(error.response)
            if (error.response.status === 409) {
                setDynamicErrors({
                    ...error.response?.data?.password && { password: 'Incorrect Password' },
                    ...error.response?.data?.email && { email: 'Incorrect email' },
                })
            }
        }
    }

    const { data, errors, handleChange, handleSubmit } = useFormValidation({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: {
            username: {
                required: {
                    value: true,
                    message: "email is a required",
                },
            },
            password: {
                required: {
                    value: true,
                    message: 'password required'
                }
            }
        },
        submit: submit
    })





    return (
        <div className="bg-gradient-to-r from-blue-400  to-green-500   h-screen w-screen">
            <div className="flex justify-center items-center  h-full ">

                <div className="bg-white py-8 px-10 md:w-2/5 sm:w-2/5  rounded">
                    <div className="flex justify-center">
                        <img className="" src={Logo} alt="logo" style={{ width: '220px' }} />
                    </div>

                    <form onSubmit={handleSubmit} className=" py-6 mx-2">
                        <input
                            className={errors && errors.email ? "w-full border-b-2 border-red-500  outline-none  text-lg mt-8" :'w-full border-b-2 border-gray-300  outline-none  text-lg mt-8'}
                            onChange={handleChange("username")}
                            type="text"
                            placeholder="email" />
                       

                        {dynamicErrors && dynamicErrors.username && (<p className="text-xs text-red-500 ">{dynamicErrors.username}</p>)}
                        
                        
                        <input
                            className={errors && errors.password  ? ' w-full border-b-2 border-red-500 outline-none  text-lg mt-8': 'w-full border-b-2 border-gray-300  outline-none  text-lg mt-8'}
                            type="password"
                            onChange={handleChange("password")}
                            placeholder="password" />
                         
                         {dynamicErrors && dynamicErrors.password && (<p className="text-xs text-red-500 ">{dynamicErrors.password}</p>)}
                        

                        <div className="flex justify-center items-center ">
                            <button
                                type="submit"
                                className=" rounded-full bg-red-500 mt-8 py-2 px-10 text-xl text-white "
                            >
                                SIGN IN
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Auth
