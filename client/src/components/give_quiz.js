import React,{ useState , useEffect , useContext } from 'react'

import { Link } from 'react-router-dom';

import McqContext from '../contexts/MCQContexts/McqContext';

const Give_quiz = () => {

    const { mcqs , fillUps , Edit_MCQ_Details , Edit_Fill_Up_Details } = useContext(McqContext);

    const [ questions , setQuestions ] = useState(mcqs);

    const [ fillUp , setFillUp ] = useState(fillUps);

    const [ count , setCount ] = useState(0);

    const [ countF , setCountF ] = useState(0);

    const [ answer , setAnswer ] = useState('');

    const goToNextMcq = (e)=>{

        console.log(count);

        setCount(count+1);
    }

    const onSubmit = async (e)=>{

        e.preventDefault();

        await Edit_MCQ_Details( questions[e.target.id-1] );
    }

    const goToNextFillUp = (e)=>{

        e.preventDefault();

        setCountF(countF+1);
        
        setCount(count+1);
        
        setAnswer('');
    }

    const onSubmitFillUp = async (e) => {
        e.preventDefault();

        await Edit_Fill_Up_Details( fillUp[e.target.id-1] );
    }

    const handleChangeMcq = async (e)=>{
        console.log(e.target);

        const list = await questions.map(res=>{
         
            if(parseInt(res.questionNo)===parseInt(e.target.name)){
         
                return{
                    ...res,
                    student_response:e.target.value
                }
            }
            return res;
        })

        setQuestions(list);

        console.log(list);
    }

    const handleChangeFillUp = async (e)=>{

        setAnswer(e.target.value);

        const list = await fillUp.map(res=>{

            if(parseInt(res.questionNo)===parseInt(e.target.name)){
            
                return{
                    ...res,
                    student_response:e.target.value
                }
            }
            return res;
        })

        setFillUp(list);

        console.log(list);
    }

    const handleClickMcq = (e)=>{
       
        setCount(e.target.id-1);

        setCountF(0);
    }

    const handleClickFillUp = (e)=>{
        
        setCountF( e.target.id - 1 );

        setCount( e.target.id - 1 + questions.length ); 
    }

    return (
        <div  className='container'>
            <h1>Give Quiz</h1>

            questionNos : {questions.length}

            fillUps : {fillUp.length}

            {questions.map(q=>
                  
                  <div>
                     <span style={{padding:'10px'}}>MCQ No: {q.questionNo}</span>
                      
                     <button id={q.questionNo} onClick={handleClickMcq}>{q.student_response=='' ? 'NA' : 'A'}</button>
                                           
                  </div>
                
            )}
            {fillUp.map(q=>
                  
                  <div>
                     <span style={{padding:'10px'}}>Fill Up No: {q.questionNo}</span>
                      
                     <button id={q.questionNo} onClick={handleClickFillUp}>{q.student_response=='' ? 'NA' : 'A'}</button>
                                           
                  </div>
                
            )}

           { count < questions.length ?
               
               <form key={questions[count].questionNo} onSubmit={onSubmit} id={questions[count].questionNo}>
                  
                  <div>
                    <span style={{padding:'10px'}}>Question No: {questions[count].questionNo}</span>
                        
                    <button>{questions[count].question}</button>
                                            
                   </div>
                   <div>
                      {questions[count].options.map(op=>

                       <label>{op.option}
                          
                           <input type="radio" name={questions[count].questionNo} key={op.optionNo} value={op.optionNo} onChange={handleChangeMcq}/>
                        
                        </label>
            
                       )}
                   </div>

                   <button type="submit" >Submit</button> 
           
                   <button onClick={goToNextMcq}>Next Question</button>          
           
                </form>  
            : ( count - questions.length) < fillUp.length ? 
            
              <form key={fillUp[countF].questionNo} onSubmit={onSubmitFillUp} id={fillUp[countF].questionNo}>
                    
                    <span style={{padding:'10px'}}>Fill Up : {fillUp[countF].questionNo}</span>
                  
                    <button name={fillUp[countF].questionNo}>{fillUp[countF].question}</button>  

                    <input name={fillUp[countF].questionNo} value={answer} placeholder='your answer..' onChange={handleChangeFillUp}/>
           
                    <button type="submit" >Submit</button> 
                    
                    <button onClick={goToNextFillUp}>Next Question</button>          
              </form>  

            : <button>Your exam is over</button> }

            <button><Link to='/Final_Submission'>Final Submittion</Link></button>
     </div>
    )
}

export default Give_quiz