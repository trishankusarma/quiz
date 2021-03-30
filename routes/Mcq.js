const express = require('express');

const router = new express.Router();

const Mcq = require('../models/MCQ');

//   AddMcqs
router.post('/add',async (req,res)=>{
    
    console.log(req.body);

    try {
         const mcq = new Mcq({
            questionNo:req.body.questionNo,
            question:req.body.question,
            noOfOptions:req.body.noOfOptions,
            correct_answer:req.body.correct_answer,
            student_response:req.body.student_response,
            marks:req.body.marks
        });

        mcq['options']=[];

        req.body['options'].forEach(q => {
            mcq['options'] = mcq['options'].concat(q)
        });

        await mcq.save();
        
        res.status(201).json(mcq);

        } catch (error) {
        
          console.log(error);
        
         res.status(500).json({error : 'Server Error' });
      }
})

//   Edit_MCQ_Details  
router.patch('/edit/:_id',async (req,res)=>{
    
    console.log(req.body);

    try {
        const updates=Object.keys(req.body);

        const _id = req.params._id;
        
        const mcq = await Mcq.findById(_id);
    
        if(!mcq){
            res.json({msg:"Invalid Id"});
        }
        updates.forEach((update)=>update==='options' ? mcq['options']=[] : mcq[update]=req.body[update] );

        req.body['options'].forEach(q => {
            mcq['options'] = mcq['options'].concat(q)
        });
      
        await mcq.save();
      
        res.status(200).json(mcq);   
      
    } catch (error) {
    
        res.json({msg:'Server Error'});
    }
})

module.exports = router;