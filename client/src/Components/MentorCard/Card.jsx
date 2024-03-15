import React from 'react';
import styles from './Card.module.css';
import { useDispatch } from 'react-redux';
import { setMentor } from '../../Store/mentorSlice';
import { useNavigate } from 'react-router-dom';

const Card = ({mentor}) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    function clicked(){
        dispatch(setMentor(mentor));
        navigate('/mystudents');
    }

     return (
        <div className={styles.cardWrapper}>
            <div className={styles.card} onClick={clicked}>
                <div className={styles.avatar}>
                    <div className={styles.mentorVector}>{mentor?.mentorName.split(" ")[0][0] + mentor?.mentorName.split(" ")[1]} </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.id}>
                        <div className={styles.info_row}>
                        <p className={styles.text}>ID</p>
                        <p className={styles.text}>{mentor?.mentorId}</p>
                        </div>
                        <div className={styles.info_row}>
                        <p className={styles.text}>Name</p>
                        <p className={styles.text}>{mentor?.mentorName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card