import React from 'react'
import styles from './Error.module.css'

const Error = () => {
  return (
    <div className={styles.wrapper}>
        <h1 className={styles.text}>404</h1>
        <h2 className={styles.text}>Page Not Found</h2>
    </div>
  )
}

export default Error