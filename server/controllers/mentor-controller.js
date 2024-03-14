import mentorUtil  from '../utils/mentor-util.js';
import studentUtil from '../utils/student-util.js';
import { jsPDF } from "jspdf"; // will automatically load the node version
import path from'path';
import crypto from 'crypto';


    const createMentor=async(req, res)=>{
        
        // Get data from the frontend
        const { mentorId, mentorName, studentIds } = req.body;

        // If mentor ID or mentor Name is not present, send a message to require all data
        if(!mentorId || !mentorName){
            res.status(404).send("All fields are required");
        }

        // create a mentor
        let mentor;

        // check if the mentor is already present, then return mentor.
        // Else create new mentor in database and return it.
        try{
            mentor = await mentorUtil.findMentor({mentorId});
            if(!mentor){
                mentor = await mentorUtil.createMentor({mentorId, mentorName, studentIds});
            }
        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }

        // return status 200 if everything is ok.
        res.status(200).send(mentor);
    }

    const addStudent=async(req, res)=>{
        
        // destructure the data from the body
        const { studentId, mentorId } = req.body;

        // if data is missing, send the message
        if(!studentId || !mentorId){
            res.status(404).send("ID is missing");
        }

        // create mentor variable
        let mentor;
        try{
            
            // call the addStudent method from the mentor-service file
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

            // call the removeStudent method from the mentor-service'
            student= await studentUtil.update({ideation:0, execution:0, viva:0, presentation:0, remarks:"No remarks", studentId})
            // console.log(student);
            mentor = await mentorUtil.removeStudent({studentId, mentorId});

        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }

        res.status(200).send(mentor);
    }

    const submit=async(req, res)=>{
        const { mentorId } = req.body;
        
        let updatedStudents;
        
        try{

            // call the submit function from the mentor-service file
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
        console.log(id)
        const allStudents = await mentorUtil.getMyStudents(id)
        res.status(200).send(allStudents);
    }


export { createMentor, addStudent, removeStudent, submit, getMentors, getMyStudents }