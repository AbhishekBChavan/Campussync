const router=require('express').Router(),db=require('../db'),auth=require('../middleware');
router.get('/',auth,async(req,res)=>{try{const [rows]=await db.query('SELECT * FROM courses ORDER BY id DESC');res.json(rows)}catch(e){console.error(e);res.status(500).json({message:'Could not fetch courses.'})}});
router.post('/',auth,async(req,res)=>{try{const {name,faculty,semester}=req.body;await db.query('INSERT INTO courses (name,faculty,semester) VALUES (?,?,?)',[name,faculty,semester]);res.status(201).json({message:'Course added.'})}catch(e){console.error(e);res.status(500).json({message:'Could not add course.'})}});
module.exports=router;
