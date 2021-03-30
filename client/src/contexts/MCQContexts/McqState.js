import React,{useReducer} from 'react';
import McqReducer from './McqReducer';
import McqContext from './McqContext';

import axios from 'axios';

import { MCQ_CREATION_DETAILS , ADD_MCQ , ADD_FILL_UP  , EDIT_FILL_UP_RESPONSES , EDIT_MCQ_RESPONSES } from '../types';

const McqState=(props)=>{

   const initialState={
       formCreationDetails:null,
       mcqs:[],
       fillUps:[]
   }

   const [state, dispatch] = useReducer(McqReducer, initialState);

   const GetFormCreationDetails = (data)=>{
   
    dispatch({
        type:MCQ_CREATION_DETAILS,
        payload:data
     })
   }

   const AddMcqs = async (data)=>{

      // console.log(file);

      // const formData = new FormData();

      // questionNo:mcqs.length+1,
      //   question:'',
      //   noOfOptions:'',
      //   options:[{
      //      optionNo:1,
      //      option:''
      //   }],
      //   correct_answer:'',
      //   student_response:'',
      //   marks:'',
      //   mcqPaperType:'',
      //   mcqPaper:null

      // formData.append('questionNo',data.questionNo);
      // formData.append('question',data.question);
      // formData.append('options',data.options);
      // formData.append('correct_answer',data.correct_answer);
      // formData.append('marks',data.marks);
      // formData.append('questionFile',fileD);


      // const config = {
      //     headers: {
      //         'content-type': 'multipart/form-data'
      //     }
      // };

      const config = {
         header: {
           'Content-Type': 'application/json'
         }
       }

    const res = await axios.post('/mcqs/add',data,config);

    console.log(res.data);
    
    dispatch({
        type:ADD_MCQ,
        payload:res.data
     })
   }
   console.log(state.mcqs)
   const AddFillUps = async (data)=>{

      const config = {
         header: {
           'Content-Type': 'application/json'
         }
       }
     
    const res = await axios.post('/fill_up/add',data,config);

    console.log(res);
    
    dispatch({
        type:ADD_FILL_UP,
        payload:res.data
     })
   }

   const Edit_MCQ_Details = async ( q )=>{

      const config = {
         header: {
           'Content-Type': 'application/json'
         }
       }
    
         const res = await axios.patch(`/mcqs/edit/${q._id}`,q,config);
     
         console.log(res);

         dispatch({
            type:EDIT_MCQ_RESPONSES,
            payload:res.data
         })
   }

   const Edit_Fill_Up_Details = async ( q )=>{

      const config = {
         header: {
           'Content-Type': 'application/json'
         }
      }
      
         const res = await axios.patch(`/fill_up/edit/${q._id}`,q,config);
     
         console.log(res);

         dispatch({
            type:EDIT_FILL_UP_RESPONSES,
            payload:res.data
         })
   }

   return(
      <McqContext.Provider
      value={{
        formCreationDetails:state.formCreationDetails,
        GetFormCreationDetails,
        AddFillUps,
        mcqs:state.mcqs,
        fillUps:state.fillUps,
        AddMcqs,
        Edit_MCQ_Details , 
        Edit_Fill_Up_Details
      }} 
      >{props.children}</McqContext.Provider>
   )
}
export default McqState;
