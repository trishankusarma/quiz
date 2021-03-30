import React,{ useState , useEffect , useContext } from 'react'

import { Link } from 'react-router-dom';

import McqContext from '../contexts/MCQContexts/McqContext';

const Final_Submission = () => {

    const { mcqs , fillUps } = useContext(McqContext);

    const [ questions , setQuestions ] = useState(mcqs);

    const [ fillUp , setFillUp ] = useState(fillUps);

    const [ count , setCount ] = useState(0);

    console.log('Mcqs',questions);

    console.log('fillUps',fillUp);

    useEffect(async () => {
        
        const correctQs = questions.filter(q=>{
            return q.correct_answer == q.student_response;
        })

        const TotalMarksAwarded = correctQs.reduce((acc, q) => (
            acc + parseInt(q.marks)
         ), 0)

         setCount(TotalMarksAwarded);
    }, [])

    return (
        <div  className='container'>
            <h1>Get Answers Checked</h1>

            questionNos : {questions.length}

            fillUps : {fillUp.length}

            {questions.map(q=>
               <div>
                  
                  <div>
                     <span style={{padding:'10px'}}>Question No: {q.questionNo}</span>
                      
                     <button>{q.question}</button>
                                           
                  </div>
                 <div>
                    {q.options.map(op=>

                     <label>{op.option}

                         { parseInt( op.optionNo ) === parseInt( q.correct_answer ) ?                 
                            <input type="radio" name={q.questionNo} key={op.optionNo} value={op.optionNo} checked/>
                         :  <input type="radio" name={q.questionNo} key={op.optionNo} value={op.optionNo} />
                         }
                                              
                      </label>
                    
                     )}
                 </div>
                   <div>
                        <button style={{padding:'0.5rem'}}>Correct Answer : { q.correct_answer }</button>
                        <button style={{padding:'0.5rem'}}>Your Response : { q.student_response }</button>

                        {  q.correct_answer == q.student_response ? `Correct : Marks Awarded: ${q.marks}` : `Wrong : Marks Awarded: 0` }
                   </div>
               </div> )}

               { fillUp.map(q=>
                    
                    <div>
                         <span style={{padding:'10px'}}>Fill Up : {q.questionNo}</span>
                  
                         <button name={q.questionNo}>{q.question}</button>  

                         <div>
                             <button style={{padding:'0.5rem'}}>Correct Answer : { q.correct_answer }</button>
                             <button style={{padding:'0.5rem'}}>Your Response : { q.student_response }</button>
                        </div>

                        {  q.correct_answer == q.student_response ? `Correct : Marks Awarded: ${q.marks}` : `Wrong : Marks Awarded: 0` }

                    </div>
              ) }

            
            Marks Given : { count }

            <button><Link to='/'>Exam Done</Link></button>

     </div>
    )
}

export default Final_Submission
