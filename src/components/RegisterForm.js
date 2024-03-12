import React from 'react'
import styles from './registerform.style.module.css'
import { FaArrowLeftLong } from "react-icons/fa6";

const RegisterForm = (props) => {

    const handleFormModal = () => {
        props.handleFormModal(false)
    }
    return (
        <div>

            <div className={`${styles.container} ${props.darkTheme ? styles.containerDark :""}`}>
                <div className={styles.backBtn} onClick={handleFormModal}>
                    <FaArrowLeftLong />
                </div>
                <div className={styles.details}>
                    <div className={styles.content}>
                        <div className={styles.date}>February 7, 2024</div>
                        {props.dataNumber >= 2 && (<div className={styles.eventName}>Marathon</div>)}
                        {props.dataNumber >= 2 && (<div className={`${styles.location} ${props.darkTheme ? styles.locationDark: ""}`}>Berlin, Germany</div>)}
                        <div className={`${styles.desc} ${props.darkTheme ? styles.descDark : ""}`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat delectus optio sequi perspiciatis, animi nulla architecto ipsam nisi deserunt, deleniti enim dolorum quam numquam in quasi blanditiis ipsum voluptas veniam?</div>
                    </div>
                    <h1 className={styles.formHeading}>Register Yourself</h1>
                    <form className={`${styles.form} ${props.darkTheme ? styles.darkForm: ""}`}>
                        <div className={styles.name}>Name</div>
                        <input className={styles.input}></input>
                        <div className={styles.email} >Email</div>
                        <input className={styles.input}></input>
                        <div>
                            <button type='submit' className={styles.submitBtn}>Register</button>
                        </div>

                    </form>
                </div>
                {props.dataNumber >= 2 && (<div className={styles.img}>
                    <img
                        src="/marathon.png"
                        width={500}
                        height={350}
                        alt="Author"
                        style={{ borderRadius: 20 }}
                    />
                </div>)}
            </div>
        </div>
    )
}

export default RegisterForm