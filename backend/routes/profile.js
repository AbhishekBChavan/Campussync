const router=require('express').Router(),db=require('../db'),auth=require('../middleware');
router.get('/',auth,async(req,res)=>{const [rows]=await db.query('SELECT id,full_name,phone,email,username,course,year,role FROM users WHERE id=?',[req.user.id]);if(!rows.length)return res.status(404).json({message:'User not found'});res.json(rows[0])});
module.exports=router;
