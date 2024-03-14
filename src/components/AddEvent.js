import React, { useEffect, useState } from 'react'
import styles from './addevent.style.module.css'
import SearchIcon from '../icons/search.svg'
import AddEventForm from './AddEventForm'
import EventData from '../eventdata/demoEvent .json'

const AddEvent = () => {
    const [searchInput, setSearchInput] = useState("")
    const [matchingEvents, setMatchingEvents] = useState([]); // All events that macthes ther search
    const [selectedEvent, setSelectedEvent] = useState(null); // Event that we are selecting and sending to form
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isFormBlur, setIsFormBlur] = useState(true)
    const [isFormDisbaled, setIsFormDisabled] = useState(true)

    const filterEvents = (event) => {
        const eventWords = event.name.toLowerCase().split(" ");
        return eventWords.includes(searchInput.toLowerCase());
    };
    // Update matching events as user types
    const handleInputChange = (e) => {
        e.preventDefault()
        const matches = EventData.filter(filterEvents);
        setMatchingEvents(matches);
    };

    useEffect(() => {
        setIsDropdownOpen(true)
    }, [matchingEvents])

    const handleEventClick = (event) => {
        setIsDropdownOpen(false)
        setSelectedEvent(event);
        setIsFormBlur(false)
    }

    const handleButtonClick = ()=>{
        if(isFormBlur){
            setIsFormBlur(false)
        }
        setIsFormDisabled(!isFormDisbaled)
    }

    return (
        <div className={styles.container}>
            <button className={styles.btn} onClick={handleButtonClick}>Add Event Manually</button>
            <form className={styles.SearchFormContainer} onSubmit={handleInputChange}>
                <div className={styles.search}>
                    <input
                        type='text'
                        placeholder='Enter Event Url or Search for an Event'
                        onChange={(e) => setSearchInput(e.target.value)}
                        value={searchInput}
                    />
                    <button type='submit'><img src={SearchIcon} alt='search' /></button>
                    {isDropdownOpen && (
                        <div className={styles.dropdown}>
                            {matchingEvents.map(event => (
                                <div key={event.id} className={styles.dropdownItem} onClick={() => handleEventClick(event)}>
                                    {event.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className={`${isFormBlur ? styles.eventFormBlur : ""}`}>
                    <AddEventForm selectedEvent={selectedEvent} formDisabled = {isFormDisbaled}/>
                </div>
            </form>
        </div>
    )
}

export default AddEvent