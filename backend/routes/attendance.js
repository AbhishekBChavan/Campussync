const router=require('express').Router(),db=require('../db'),auth=require('../middleware');
router.post('/',auth,async(req,res)=>{try{const records=req.body.records||[];for(const r of records)await db.query('INSERT INTO attendance (student_id,attendance_date,status) VALUES (?,?,?) ON DUPLICATE KEY UPDATE status=VALUES(status)',[r.studentId,r.date,r.status]);res.json({message:'Attendance saved.'})}catch(e){console.error(e);res.status(500).json({message:'Could not save attendance.'})}});
router.get('/summary',auth,async(req,res)=>{const [r]=await db.query("SELECT ROUND(COALESCE(SUM(status='Present')/NULLIF(COUNT(*),0)*100,0),0) percentage FROM attendance");res.json(r[0]||{percentage:0})});
module.exports=router;
