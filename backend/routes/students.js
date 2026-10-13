const router=require('express').Router(),db=require('../db'),auth=require('../middleware');
router.get('/',auth,async(req,res)=>{try{const [rows]=await db.query('SELECT * FROM students ORDER BY id DESC');res.json(rows)}catch(e){console.error(e);res.status(500).json({message:'Could not fetch students.'})}});
router.post('/',auth,async(req,res)=>{try{const {fullName,rollNo,course,year,semester}=req.body;await db.query('INSERT INTO students (full_name,roll_no,course,year,semester) VALUES (?,?,?,?,?)',[fullName,rollNo,course,year,semester]);res.status(201).json({message:'Student added.'})}catch(e){console.error(e);res.status(500).json({message:'Could not add student.'})}});
router.delete('/:id',auth,async(req,res)=>{try{await db.query('DELETE FROM students WHERE id=?',[req.params.id]);res.json({message:'Deleted.'})}catch(e){console.error(e);res.status(500).json({message:'Could not delete student.'})}});
module.exports=router;
