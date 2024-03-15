import mentorUtil  from '../utils/mentor-util.js';
import studentUtil from '../utils/student-util.js';

    const createMentor=async(req, res)=>{
        
        const { mentorId, mentorName, studentIds } = req.body;

        if(!mentorId || !mentorName){
            res.status(404).send("All fields are required");
        }

        let mentor;
        try{
            mentor = await mentorUtil.findMentor({mentorId});
            if(!mentor){
                mentor = await mentorUtil.createMentor({mentorId, mentorName, studentIds});
            }
        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }

        res.status(200).send(mentor);
    }

    const addStudent=async(req, res)=>{
        
        const { studentId, mentorId } = req.body;

        if(!studentId || !mentorId){
            res.status(404).send("ID is missing");
        }

        let mentor;
        try{
            
            mentor = await mentorUtil.addStudent({studentId, mentorId});

            if(!mentor){
                return res.status(500).json({message: "Can't add student"});
            }

        }catch(err){
            console.log(err);
            return res.status(500).json({message: "DB error"});
        }
        if(mentor.message){
            return res.status(410).json(mentor.message);
        }
        return res.status(200).json(mentor);
    }

    const removeStudent=async(req, res)=>{

        const { studentId, mentorId } = req.body;
        if(!studentId || !mentorId){
            res.status(404).send("ID is missing");
        }

        let mentor, student;
        try{
            student= await studentUtil.update({Ideation:0, Execution:0, Viva:0, Presentation:0, Remarks:"No remarks", studentId})
            // console.log(student);
            mentor = await mentorUtil.removeStudent({studentId, mentorId});

        }catch(err){
            console.log(err);
            return res.status(500).json({message: "DB error"});
        }

        res.status(200).send(mentor);
    }

    const submit=async(req, res)=>{

        // get the mentor id from the body
        // check >=3 <=4 students
        // console.log(req.body);
        // get array of students
        // set student flag true 
        // set mentor flag true
        // send emails to students

        const { mentorId } = req.body;
        
        let updatedStudents;
        
        try{

            updatedStudents = await mentorUtil.submit(mentorId);
            if(updatedStudents.message){
                return res.status(410).json(updatedStudents.message);
            }

        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }
    
        res.status(200).send(updatedStudents);
    }

    const getMentors=async(req, res)=>{
        let mentors;

        try{
            mentors = await mentorUtil.mentors();
        }catch(err){
            console.log(err);
            res.status(500).send("DB error")
        }
        res.status(200).send(mentors);
    }

    const getMyStudents=async(req, res)=>{
        const { id } = req.body;
        // console.log(id)
        const allStudents = await mentorUtil.getMyStudents(id)
        res.status(200).send(allStudents);
    }


export { createMentor, addStudent, removeStudent, submit, getMentors, getMyStudents }