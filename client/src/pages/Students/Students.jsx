import React, { useState, useEffect } from 'react';
import styles from './Students.module.css';
import Card from '../../Components/StudentCard/Card';
import { getStudents } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setMentorStudents } from '../../Store/studentSlice';
import { setLoading } from '../../Store/loadingSlice';

const Students = () => {

    const [students, setStudents] = useState([]);
    const [status, setStatus] = useState(0);
    const [showStudents, setShowStudents] = useState([]);

    const filterStudents = () => {
        if(status===0){
            setShowStudents(students);
        }
        else if(status===1){
            setShowStudents(students.filter(student=>student.assigned));
        }
        else{
            setShowStudents(students.filter(student=>!student.assigned));
        }
    }

    useEffect(() => {   
        filterStudents();
    }
    , [status, students]);

    const stAssigned=()=>{
        setStatus(1);
    }
    
    const stNotAssigned=()=>{
        setStatus(2);
    }

    const stAll=()=>{
        setStatus(0);
    }

    let loading = useSelector((state)=> state.loadingSlice.loading);

    useEffect(() => {

    const allStudents=async()=>{
            dispatch(setLoading(true))
            const { data } = await getStudents();
            // console.log(data);
            setStudents(data);
            dispatch(setLoading(false))
        }

        allStudents();
    }, [status]);


    const dispatch = useDispatch();
    dispatch(setMentorStudents(students))

    return (
        <>
            {
            loading ? <div className={styles.loader}><img src="https://c.tenor.com/FIzWAbQcjpYAAAAC/tenor.gif" alt="Loading..." /></div>:
            <div>
            <div className={styles.filters}>
                <div className={styles.filter}>
                    <div className={styles.assigned}>
                        <button onClick={stAssigned} className={styles.status}>Assigned</button>
                    </div>
                    <div className={styles.assigned}>
                        <button onClick={stAll} className={styles.status}>All Students</button>
                    </div>
                    <div className={styles.assigned}>
                        <button onClick={stNotAssigned} className={styles.status}>Unassigned</button>
                    </div>
                </div>
            </div>
            <div className={styles.hero}>
                <div className={styles.wrapper}>
                    {
                        showStudents.map(student => (
                                <Card key={student._id} student={student} status={status} />

                        ))
                    }
                </div>
            </div>
            </div>
        }
        </>
    )
}

export default Students