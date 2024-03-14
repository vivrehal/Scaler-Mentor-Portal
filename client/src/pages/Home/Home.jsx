import React, { useState, useEffect } from 'react';
import styles from './Home.module.css'
import Card from '../../Components/MentorCard/Card'
import { getMentors } from '../../api';

const Home = () => {

    // Get Mentors
    const [mentors, setMentors] = useState([]);
    
    useEffect(() => {
        async function allMentors(){
            const { data } = await getMentors();
            console.log(data)
            setMentors(data);
        }
    
        allMentors();
      }, []);

  return (
        <>
            <div className={styles.hero}>
                <div className={styles.wrapper}>
                    {
                        mentors.map(mentor => <Card key={mentor._id} mentor={mentor} />)
                    }
                </div>
            </div>
        </>
  )
}

export default Home
