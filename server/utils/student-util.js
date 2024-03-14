import Student from "../models/student-model.js";
import marksheet from "../templates/marksheet.js";
import sendEmail from './email-util.js';


    const findStudent=async(filter)=>{

        // Find the student matcing the filter:id
        const student = await Student.findOne(filter);
        return student;
    }



    const createStudent=async(data)=>{

        // Create a student in database using data
        const student = await Student.create(data);
        return student;
    }



    const setStatus=async(data)=>{
        try{
            // Update the student having _id as id, and the status from data
            await Student.updateOne({ _id: data.id }, { assigned: data.status });

        }catch(err){
            console.log(err);
        }
    }



    const submit=async(data)=>{

        // get the student ids from the array
        const students = data;
        let updatedStudents = [];
        // Traverse each student id and update it's submit field
        for(let i=0; i<students.length; i++){
            try{
                await Student.updateOne({ _id: students[i] }, { Submitted: true });
                const student = await Student.findOne( { _id: students[i] })
                updatedStudents.push(student);
                let total = 0;
                total = student.marks.Viva + student.marks.Ideation + student.marks.Execution + student.marks.Presentation;
                // console.log(total);
                // email sending service
                const response=await sendEmail({
                    from: 'dhimanvivek777@gmail.com',
                    sendername: "Vivek",
                    to: student.email,
                    subject: "Total Marks",
                    html: marksheet(student, total)
                })

                if(!response){
                    return ({message: "Email not sent", success: false});
                }

                console.log(response);
                
                console.log("success");

            }catch(err){
                console.log(err);
            }
        }

        return updatedStudents;
    }



    const update=async(data)=>{

        // get the data from the parameters
        const id = data.studentId;
        const Ideation = data.ideation;
        const Execution = data.execution;
        const Viva = data.viva;
        const Presentation = data.presentation;
        const Remarks = data.remarks;

        // create student variable
        let student;
        try{

            // update the student
            await Student.updateOne({_id: id}, {
                
                    "marks.Ideation": Ideation,
                    "marks.Execution": Execution,
                    "marks.Viva": Viva,
                    "marks.Presentation": Presentation,
                    "marks.Remarks": Remarks

            })

            // get the student
            student = await Student.findOne({_id: id});
        }catch(err){
            console.log(err);
        }

        return student;
    }


    const students=async()=>{
        const students = await Student.find();
        return students;
    }

    const getStudents=async(ids)=>{
        let allStudents = [];

        for(let i=0; i<ids.length; i++){
            const student = await Student.findOne({ _id: ids[i] });
            allStudents.push(student);
        }

        return allStudents;
    }



const studentUtil = { findStudent, createStudent, setStatus, submit, update, students, getStudents}
export default studentUtil;