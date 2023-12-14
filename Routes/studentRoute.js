import express from 'express';
import { studentList, updateStudent, deleteStudent, Dashboard, createStudent, viewStudent, searchStudent, studentDashboard } from '../Controllers/studentControllers.js';
import {adminRole, authenticate } from '../Utils/authentication.js';
const router = express.Router();


router.get('/admin-dashboard',authenticate,adminRole,Dashboard);
router.post('/create-student',authenticate,adminRole,createStudent);
router.get('/all-student/',authenticate,adminRole,studentList);
router.put('/update-student/:id',authenticate,adminRole,updateStudent);
router.get('/view-student/:id',authenticate,viewStudent);
router.delete('/delete-student/:id',authenticate,adminRole,deleteStudent);
router.post('/student-dashboard',authenticate,studentDashboard);
router.get('/search-student',authenticate,adminRole,searchStudent)

export default router;


