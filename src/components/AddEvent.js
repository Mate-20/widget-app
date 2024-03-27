import React from 'react'
import styles from './addevent.style.module.css'
import AddEventModal from './AddEventModal';

const AddEvent = () => {
    return (
        <div className={styles.bodyContainer}>
            <AddEventModal/>
        </div>
    )
}

export default AddEvent