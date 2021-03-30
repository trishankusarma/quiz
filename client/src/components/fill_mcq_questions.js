import React,{ useState , useEffect , useContext } from 'react'
import {Link} from 'react-router-dom';

import McqContext from '../contexts/MCQContexts/McqContext';

const Fill_mcq_questions = () => {

    const { mcqs , fillUps , AddFillUps , AddMcqs , Edit_MCQ_Details , Edit_Fill_Up_Details } =  useContext(McqContext);

    const [ questions , setQuestions ] = useState(mcqs);

    const [ fillUp , setFillUp ] = useState(fillUps);

    // const [ fileD , setFileD ] = useState(null); 

    // const [ response , setResponse ] = useState(null);

    const mcqQuestion = {
        questionNo:mcqs.length+1,
        question:'',
        noOfOptions:'',
        options:[{
           optionNo:1,
           option:''
        }],
        correct_answer:'',
        student_response:'',
        marks:''
        // mcqPaperType:'',
        // mcqPaper:null
    }

    const fillUpQuestion={
        questionNo:fillUps.length+1,
        question:'',
        correct_answer:'',
        student_response:'',
        marks:''
    }

    useEffect(() => {
        setQuestions([
            ...mcqs,
            mcqQuestion
        ])

        setFillUp([
            ...fillUps,
            fillUpQuestion
        ])
    }, [mcqs,fillUps])

    // const setFile = (e)=>{
    //     setFileD(e.target.files[0]);
    // }

    const handleChangeMcq = async (e)=>{

        console.log(e.target.parentElement.parentElement.id);

        const list = await questions.map(q=>{
          
            if(parseInt(q.questionNo) === parseInt(e.target.parentElement.parentElement.id)){

                if(e.target.name==='options'){
                    
                    let list1 = q.options.map(op=>{
                       
                        if(parseInt(op.optionNo) === parseInt(e.target.id)){
                            return {
                                ...op,
                                option:e.target.value
                            }
                        }
                        else{
                            return op;
                        }
                    })
                    return {
                       ...q,
                       options:list1
                    }
                }

                if(e.target.name === 'noOfOptions'){
                    
                    let list2 = [];
                    
                    for(let i=0 ; i<e.target.value ; i++ ){
                        list2.push({
                            optionNo:`${i+1}`,
                            option:''
                        })
                    }
                    return{
                        ...q,
                        noOfOptions:e.target.value,
                        options:list2
                    }
                }

                if( e.target.name==='question' || e.target.name==='correct_answer' || e.target.name==='marks' ){

                 return {
                     ...q,
                     [e.target.name]:e.target.value
                 }
               }
            }
            else{
                return q;       
            }
        })
        await setQuestions(list);
        console.log(list);
    }

    const handleChangeFillUp = async (e)=>{

        const list = await fillUp.map(q=>{
          
            if(parseInt(q.questionNo) === parseInt(e.target.parentElement.id)){
                 return {
                    ...q,
                    [e.target.name]:e.target.value
                 }
            }
            else{
                return q;      
            }
        })
        await setFillUp(list);
        console.log(list);
    }

    const onSubmit=async (e)=>{

        e.preventDefault();

    //     if(fileD && !(fileD.type==='image/png' || fileD.type==='image/jpg' || fileD.type==='image/jpeg' )){
        
    //         setResponse(`Please Upload a image or pdf less than 1MB `);
    //         return;
    //     }

    //    if(fileD && fileD.size>100000){
       
    //        setResponse(`Please Upload a image or pdf less than 100kb ${fileD.size} kb is not allowed`);
    //        return;
    //     }
        
        if( parseInt( e.target.id ) === parseInt( questions.length )){
    
            console.log("question",questions[e.target.id-1]);

            await AddMcqs(questions[e.target.id-1]);
            // await AddMcqs(questions[e.target.id-1],fileD);
    
            await setQuestions([...mcqs,mcqQuestion]);

            console.log("mcqs",mcqs);

            console.log("Questions",questions);

        }else{
            //edit
            await Edit_MCQ_Details( questions[e.target.id-1]);

            await setQuestions(mcqs);
        }

        console.log(questions);
    }

    const onSubmitFillUp = async (e)=>{
       
        e.preventDefault(e.target.id);

        if( parseInt( e.target.id ) === parseInt( fillUp.length )){

           await AddFillUps(fillUp[e.target.id-1]);

           await setFillUp([...fillUps,fillUpQuestion]);
        
        }else{
           await Edit_Fill_Up_Details(fillUp[e.target.id-1]);

           await setFillUp(fillUps);
       }
        console.log(fillUp);
    }

    return (
        <div  className='container'>
            <h1>Fill_mcq_questions</h1>

            {questions.map(q=>
              <form key={q.questionNo} id={q.questionNo} onSubmit={onSubmit}>
                  
                   <div>
                      <span style={{padding:'10px'}}>{q.questionNo}</span>
                   
                      <input type='text' name='question' value={q.question} placeholder='Enter question' onChange={handleChangeMcq} />

                      {/* <input type='file' name='questionFile' placeholder='Add Question as Image' onChange={setFile}/>     */}
                     
                      <input type='Number' name='noOfOptions' value={q.noOfOptions} placeholder='Enter no of options' required onChange={handleChangeMcq} /> 
                    </div>
                    <div>
                       {q.options.map(op=>
                           <input key={op.optionNo} id={op.optionNo} name='options' value={op.option} placeholder='Enter options'  required onChange={handleChangeMcq}  />
                        )}
                    </div> 
                    <div>
                        <input type='text' name='correct_answer' value={q.correct_answer} placeholder='Enter Correct Option' required onChange={handleChangeMcq} />    
                         
                        <input type='Number' name='marks' value={q.marks} placeholder='Enter Marks' required onChange={handleChangeMcq} />    
                    </div>
                    <button type="submit">{parseInt( q.questionNo ) === parseInt( questions.length ) ? 'Add Question' : 'Edit Question' }</button>          
              </form>   
            )}
            
            <h1>Fill_up_the_blanks</h1>

            {fillUp.map(q=>
            
              <form key={q.questionNo} onSubmit={onSubmitFillUp} id={q.questionNo}>
              
                  <span style={{padding:'10px'}}>{q.questionNo}</span>
              
                  <input type='text' name='question' value={q.question} placeholder='Enter FILL up' required onChange={handleChangeFillUp} />    
                  
                  <input type='text' name='correct_answer' value={q.correct_answer} placeholder='Enter Correct Option' required onChange={handleChangeFillUp} />    

                  <input type='Number' name='marks' value={q.marks} placeholder='Enter Marks' required onChange={handleChangeFillUp} />    
                  
                  <button type="submit">{parseInt( q.questionNo ) === parseInt( fillUp.length ) ? 'Add Question' : 'Edit Question' }</button>          
              </form>   
            )}
            
            <button><Link to='/give_quiz'>Click to Quiz section</Link></button>
        </div>
    )
}

export default Fill_mcq_questions
