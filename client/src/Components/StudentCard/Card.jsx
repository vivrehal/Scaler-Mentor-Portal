import React, {useState} from 'react';
import styles from './Card.module.css';
import { addStudent } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setLoading } from '../../Store/loadingSlice';

const Card = ({student}) => {

    const navigate = useNavigate();
    const assigned = student.assigned;
    const studentId = student._id;
    const mentorId = useSelector((state)=> state.mentorSlice.mentor._id);
    let submitted = false;
    submitted = useSelector((state)=> state.mentorSlice.mentor.submit);
    const dispatch = useDispatch();

    const add=async()=>{
        dispatch(setLoading(true))
      try {
          const { data } = await addStudent({ studentId, mentorId })
          // student.handleCheck(student);
          console.log(data);
          navigate('/mystudents')
      } catch (error) {
            console.log(error.response.data)
            alert(error.response.data)
      }
        dispatch(setLoading(false))
    }

    // const [checked, setChecked] = useState(false)


     return (
        <>
            <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <h2 className={styles.studentId}>{student.studentId}</h2>
                <div className={styles.avatar}>
                <div className={styles.studentVector}>
                  {student?.studentName.split(' ')[0][0] + student?.studentName.split(' ')[1] }
                </div>
                </div>
                <div className={styles.info}>
                        <div className={styles.id}>
                            <h2 className={styles.text}>{student.studentName}</h2>
                            <h2 className={styles.text}>cgpa : {((student.marks.Ideation + student.marks.Viva + student.marks.Execution + student.marks.Presentation)/40)*10}</h2>
                            <h2 className={styles.text}>Total : {student.marks.Ideation + student.marks.Viva + student.marks.Execution + student.marks.Presentation}
                        </h2>
                       <div>
                            {!assigned && !submitted && <button className={styles.add} onClick={add}> Add </button>}
                            {assigned && !submitted && <button className={styles.disabled} disabled> Assigned </button>}
                            {submitted && <button className={styles.disabled} disabled>You've already Submitted </button>}
                            </div>
                        </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Card