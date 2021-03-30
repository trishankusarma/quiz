const mongoose = require('mongoose');

const McqSchema = new mongoose.Schema({
    questionNo:{
        type:Number,
        required:true
    },
    question:{
        type:String
    },
    noOfOptions:{
        type:Number,
        required:true
    },
    options:[{
        optionNo:{
            type:Number
        },
        option:{
            type:String
        }
    }],
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

const MCQ = mongoose.model('MCQ',McqSchema);

module.exports = MCQ;

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

// questionNo question noOfOptions options correct_answer marks