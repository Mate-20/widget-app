import React, { useState } from 'react'
import styles from './addevent.style.module.css'
import SearchIcon from '../icons/search.svg'
import AddEventForm from './AddEventForm'

const AddEvent = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(true)

    return (
        <div className={styles.container}>
            <div className={styles.btns}>
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={isSearchOpen ? styles.activeBtn : ""}>Search For Event</button>
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={!isSearchOpen ? styles.activeBtn : ""}>Add Event Manually</button>
            </div>
            <div className={styles.SearchFormContainer}>
                {isSearchOpen ? <div className={styles.search}>
                    <img src={SearchIcon} alt='search' />
                    <input type='text' placeholder='Enter Event Url or Search for an Event' />
                </div> : <AddEventForm />}
            </div>
        </div>
    )
}

export default AddEvent