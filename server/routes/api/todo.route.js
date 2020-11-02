const express=require('express');
const router=express.Router();
const todoModel=require('../../models/todos.model');
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json()

router.get('/todolist',async(req,res)=>{
    await todoModel.getAllTodo().then(result=>{
        return res.status(200).json(result.hits.hits);
    }).catch(err=>{
        console.log(err);
        return res.send(404);
    });
})
router.post('/delete',async(req,res)=>{
    const id=req.query.id;
    console.log(id);
    await todoModel.deleteTodo(id).then(result=>{
        console.log(result)
    }).catch(err=>{
        console.log(err);
        return res.json(false);
    });
    await todoModel.getAllTodo().then(result=> {
        console.log(result);
        return res.status(200).json(result.hits.hits);
    }).catch(err=>{throw err})

})
router.post('/update',jsonParser,(req,res)=>{
    todoModel.updateTodo(req.body)
})
module.exports=router;