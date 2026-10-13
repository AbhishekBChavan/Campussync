const router=require('express').Router(),db=require('../db'),auth=require('../middleware');
router.get('/',auth,async(req,res)=>{try{const [rows]=await db.query('SELECT * FROM notices ORDER BY created_at DESC');res.json(rows)}catch(e){console.error(e);res.status(500).json({message:'Could not fetch notices.'})}});
router.post('/',auth,async(req,res)=>{try{const {title,content}=req.body;await db.query('INSERT INTO notices (title,content) VALUES (?,?)',[title,content]);res.status(201).json({message:'Notice added.'})}catch(e){console.error(e);res.status(500).json({message:'Could not add notice.'})}});
module.exports=router;
