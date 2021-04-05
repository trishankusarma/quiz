import React from 'react'

import { Link } from 'react-router-dom';

const Create_mcq = () => {
    return (
        <div className='container'>
            <h1>CREATE MCQ</h1>

            <button ><Link to='/mcq_form'>Create MCQ</Link></button>
        </div>
    )
}

export default Create_mcq
