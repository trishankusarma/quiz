import React,{ useState , useEffect , useContext } from 'react'

import { Link } from 'react-router-dom';

import McqContext from '../contexts/MCQContexts/McqContext';

const Final_Submission = () => {

    const { mcqs , fillUps } = useContext(McqContext);

    const [ questions , setQuestions ] = useState(mcqs);

    const [ fillUp , setFillUp ] = useState(fillUps);

    console.log('Mcqs',questions);

    console.log('fillUps',fillUp);

    return (
        <div  className='container'>
            <h1>Get Answers Checked</h1>

            questionNos : {questions.length}

            fillUps : {fillUp.length}


            {questions.map(q=>{
                  <div>
                  
                    <div>
                       <span style={{padding:'10px'}}>Question No: {q.questionNo}</span>
                        
                       <button>{q.question}</button>
                                             
                    </div>
                   <div>
                      {q.options.map(op=>

                       <label>{op.option}
                          
                           <input type="radio" name={q.questionNo} key={op.optionNo} value={op.optionNo} />
                        
                        </label>
                      
                       )}
                   </div>
                   <div>
                       Correct Answer : { q.correct_answer }
                       Your Response : { q.student_response }
                   </div>
                 </div> 
              })}
              
              { fillUp.map(q=>{
                    
                    <div>
                         <span style={{padding:'10px'}}>Fill Up : {q.questionNo}</span>
                  
                         <button name={q.questionNo}>{q.question}</button>  

                         <div>
                             Correct Answer : { q.correct_answer }
                             Your Response : { q.student_response }
                        </div>
                    </div>
              }) }

            <button><Link to='/'>Exam Done</Link></button>

     </div>
    )
}

export default Final_Submission
