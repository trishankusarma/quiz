import { MCQ_CREATION_DETAILS , ADD_MCQ , ADD_FILL_UP  , EDIT_FILL_UP_RESPONSES , EDIT_MCQ_RESPONSES } from '../types';

export default (state,{type,payload})=>{
   switch(type){
        case MCQ_CREATION_DETAILS:
            return{
               ...state,
               formCreationDetails:payload
            }
         case ADD_MCQ:
            return{
               ...state,
               mcqs:[...state.mcqs,payload]
            }
         case ADD_FILL_UP:
            return{
               ...state,
               fillUps:[...state.fillUps,payload]
            }
        case EDIT_MCQ_RESPONSES:
           return{
              ...state,
              mcqs:state.mcqs.map(res=>parseInt(res.questionNo)===parseInt(payload.questionNo) ? payload : res )
           }
        case EDIT_FILL_UP_RESPONSES:
           return{
              ...state,
              fillUps:state.fillUps.map(res=>parseInt(res.questionNo)===parseInt(payload.questionNo) ? payload : res )
           }
        default:
            return state;
   }
}