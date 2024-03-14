import studentUtil from '../utils/student-util.js';


    const createStudent=async(req, res)=>{
        
        // destructure the data from the body
        const { studentId, studentName, cgpa, email } = req.body;

        // If student ID or student Name is not present, send a message to require all data
        if(!studentId || !studentName || !email){
            res.status(404).send("All mandatory fields are required");
        }

        // create a student
        let student;

        // check if the student is already present, then return student.
        // Else create new student in database and return it.
        try{
            student = await studentUtil.findStudent({studentId})
            if(!student){
                student = await studentUtil.createStudent({studentId, studentName, cgpa, email});
            }
        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }

        // return status 200 if everything is ok.
        res.status(200).send(student);
    }

    const updateMarks=async(req, res)=>{

        // destructure data from the body
        const { studentId, ideation, execution, viva, presentation, remarks } = req.body;

        // declare student
        console.log(req.body);
        let student;
        try{

            // call the update function from student-service
            student = await studentUtil.update({ studentId, ideation, execution, viva, presentation, remarks }); 

        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }

        res.status(200).send(student)
    }

    const getStudents=async(req, res)=>{
        let students;

        try{
            students = await studentUtil.students();
        }catch(err){
            console.log(err);
            res.status(500).send("DB Error");
        }

        res.status(200).send(students);
    }


export { createStudent, updateMarks, getStudents}