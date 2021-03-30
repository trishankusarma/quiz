const mongoose = require('mongoose');

const FillUpSchema = new mongoose.Schema({
    questionNo:{
        type:Number,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    correct_answer:{
        type:String,
        required:true
    },
    student_response:{
        type:String
    },
    marks:{
        type:Number,
        required:true,
        default:0
    }
})

const FillUp = mongoose.model('FillUp',FillUpSchema);

module.exports = FillUp;

//           questionNo:1,
//           question:'',
//           noOfOptions:0,
//           options:[{
//              optionNo:1,
//              option:''
//           }],
//           correct_answer:'',
//           student_response:'',
//           marks:''
// questionNo:1,
// question:'',
// correct_answer:'',
// student_response:'',
// marks:''
