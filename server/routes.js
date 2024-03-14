import { Router } from 'express';
const router = Router();
import {
    getMentors,
    getMyStudents,
    createMentor,
    addStudent,
    removeStudent,
    submit
 } from'./controllers/mentor-controller.js';

import {
    getStudents,
    updateMarks,
    createStudent,

} from './controllers/student-controller.js';

// home route
router.get('/', (req, res)=> {
    res.send("Hello from server");
})

// get routes

router.get('/mentors', getMentors);
router.get('/students', getStudents);
router.post('/mystudents', getMyStudents)

// post routes
router.post('/api/create-mentor', createMentor);
router.post('/api/create-student', createStudent);
router.post('/api/add-student', addStudent);
router.post('/api/remove-student', removeStudent);
router.post('/api/submit', submit);
router.post('/api/update', updateMarks);

export default router;