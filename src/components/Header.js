import React from 'react'
import { useHistory } from 'react-router-dom'

function Header() {

    const history = useHistory();
    const Logout = () => {
        localStorage.removeItem('token')
        history.push('/auth')
    }
    return (
        <div>
            <div className=" flex justify-end   bg-gradient-to-tr from-red-500  to-pink-400 h-40 w-full">

                <button
                    type="button"
                    onClick={Logout}
                    className="mr-10 pb-20 text-xl font-base text-white ">

                    Logout
                </button>
            </div>
        </div>
    )
}

export default Header
