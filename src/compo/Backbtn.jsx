import React from 'react'
import { useNavigate } from 'react-router-dom'

const Backbtn = () => {

    const navigate = useNavigate()

    return (
        <div className='my-20 mx-auto'>
            <a
                onClick={()=>navigate('/#projects')}
                className="w-[fit-content] cursor-pointer inline-block px-4 py-2 text-white rounded-2xl shadow bg-gradient-to-r from-black to-gray-800">
                Back to Projects
            </a>

        </div>
    )
}

export default Backbtn
