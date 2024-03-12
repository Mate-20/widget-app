import React, { useState } from 'react'
import styles from './calendar.style.module.css'
import RegisterForm from './RegisterForm';
import schedule from '../eventdata/timeslots.json'
import DarkModeIcon from '../icons/darkmode.svg'
import LightModeIcon from '../icons/lightmode.svg'
import PrevArrowIcon from '../icons/leftarrow.svg'
import NextArrowIcon from '../icons/rightarrow.svg'

const CalendarModal = (props) => {

    const [calendarDate, setCalendarDate] = useState(new Date());
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [isDateClicked, setIsDateClicked] = useState(false)
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("")
    const [IsFormOpen, SetIsFormOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);


    const handleTimeSlot = (slot) => {
        setSelectedTimeSlot(slot)
    }

    const handleFormModal = (value) => {
        SetIsFormOpen(value)
    }

    const daysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const handlePrevMonth = () => {
        const prevMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, calendarDate.getDate(), 1);
        setCalendarDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, calendarDate.getDate(), 1);
        setCalendarDate(nextMonth);
    };

    const handleThemeChange = () => {
        setIsDarkMode(!isDarkMode)
    }


    const renderDays = () => {
        const days = [];
        const daysCount = daysInMonth(calendarDate);
        const firstDay = getFirstDayOfMonth(calendarDate);

        const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        for (let i = 0; i < dayNames.length; i++) {
            days.push(
                <div key={`dayName-${i}`} className={`${styles.dayname} ${isDarkMode ? styles.daynameDark : ""}`}>
                    {dayNames[i]}
                </div>
            );
        }
        // Determine the days with schedules
        const scheduledDates = schedule.MarchSchedule.map(entry => {
            return entry.date;
        });

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className={styles.emptyday}></div>);
        }

        for (let i = 1; i <= daysCount; i++) {
            const isTodaysDate = i === calendarDate.getDate() && calendarDate.getMonth() === new Date().getMonth();
            const isScheduledDate = scheduledDates.map(date => {
                const scheduledDate = new Date(date);
                return i === scheduledDate.getDate() && calendarDate.getMonth() === scheduledDate.getMonth() && calendarDate.getFullYear() === scheduledDate.getFullYear();
            }).some(Boolean);

            const todaysDateClass = isTodaysDate ? (isDarkMode ? styles.todaysDateDark : styles.todaysDateLight) : '';
            let classNames = `${styles.calendardatebox} ${todaysDateClass} ${isScheduledDate ? styles.scheduledDate : ''} `;
            // Handle click on scheduled dates
            const handleClick = () => {
                const currentDateObject = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), i);
                const matchingEntry = schedule.MarchSchedule.find(entry => {
                    const entryDate = new Date(entry.date);
                    return entryDate.getDate() === currentDateObject.getDate() && entryDate.getFullYear() === currentDateObject.getFullYear() && entryDate.getMonth() === currentDateObject.getMonth();
                });
                const timeSlots = matchingEntry ? matchingEntry.timeSlots : [];
                setSelectedDate(currentDateObject);
                setIsDateClicked(timeSlots.length > 0);
                setSelectedTimeSlots(timeSlots);
            };

            days.push(
                <div key={`day-${i}`} className={`${classNames}`} onClick={handleClick}>
                    <div>{i}</div>
                </div>
            );
        }
        return days;
    };

    return (
        <div>
            {!IsFormOpen && (<div className={`${styles.container} ${isDarkMode ? styles.containerDark : ""}`}>
                <div className={styles.calendar}>
                    <div className={styles.calendarBtns}>
                        <button onClick={handlePrevMonth}><img src={PrevArrowIcon} alt='prev'/></button>
                        <h2 style={{ color: isDarkMode ? "white" : "black" }}>{calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                        <button onClick={handleNextMonth}><img src={NextArrowIcon} alt='next'/></button>
                    </div>
                    <div className={styles.calendarGrid}>{renderDays()}</div>
                </div>
                {isDateClicked && <div className={styles.timeSlotsContainer}>
                    <h3 style={{ color: isDarkMode ? "white" : "black" }}>Time Slots for {selectedDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
                    {selectedTimeSlots.map((slot, index) => (
                        <div className={styles.timeSlots}>
                            <div className={`${styles.timeSlot} ${selectedTimeSlot === slot ? styles.selectedTimeSlot : ''}`} key={index} onClick={() => handleTimeSlot(slot)}>{slot}</div>
                            {selectedTimeSlot === slot && <button className={styles.submit} onClick={() => handleFormModal(true)}>Next</button>}
                        </div>
                    ))}
                </div>}
                <div className={styles.themeIcon} onClick={handleThemeChange}>
                    {isDarkMode ? <img src={LightModeIcon} width={30} height={30} /> :
                        <img src={DarkModeIcon} width={30} height={30} />}
                </div>
            </div>)}

            {IsFormOpen && (<div>
                <RegisterForm darkTheme = {isDarkMode} handleFormModal={handleFormModal} dataNumber={props.dataNumber} />
            </div>)}
        </div>
    );
};


export default CalendarModal