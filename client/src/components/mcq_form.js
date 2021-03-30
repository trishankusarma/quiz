import React,{ useState ,useContext } from 'react'

import { Link } from 'react-router-dom';

import McqContext from '../contexts/MCQContexts/McqContext';

const Mcq_form = () => {

    const { GetFormCreationDetails } = useContext(McqContext);

    const [ formDetails , setFormDetails ] = useState({
        pattern:'Multiple Option Answer',
        giveAnswers:'Yes',
        nagigation:'Yes'
    })

    const { pattern , giveAnswers , nagigation  } = formDetails;

    const handleChange = (e)=>{
        setFormDetails({
            ...formDetails,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = async (e)=>{
        e.preventDefault();
        console.log(formDetails);

        GetFormCreationDetails(formDetails);
    }

    return (
        <div  className='container'>
            <h1>Mcq_form</h1>

            <form onSubmit={onSubmit} className='formData'>
                
               <h3>Whether it would be single choice or multiple choice</h3>

               <div className="options">
                   
                   <label >Multiple Option Answer
                     <input type="radio" name="pattern" value='Multiple Option Answer' onChange={handleChange}  />
                   </label>
          
                   <label >Single Option Answer
                     <input type="radio" name="pattern" value='Single Option Answer' onChange={handleChange}   />
                    </label>
         
               </div>
            

               <h3>Would You allow students to navigate back</h3>

               <div className="options">
                   
                   <label >Yes
                     <input type="radio" name="nagigation" value="Yes" onChange={handleChange} />
                   </label>
          
                   <label >No
                     <input type="radio" name="nagigation" value="No" onChange={handleChange}  />
                    </label>
         
               </div>

               <button type='submit'><Link to='/fill_mcq_questions'>Fill MCQ Questions and Fill up</Link></button>
            </form>
        </div>
    )
}

export default Mcq_form
