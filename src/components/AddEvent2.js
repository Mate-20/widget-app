import React, { useState, useEffect } from 'react'
import styles from './addevent2.style.module.css'
import RangePicker from './RangePicker';
import LocationIcon from '../icons/location.svg'
import PeopleIcon from '../icons/people.svg'
import DateIcon from '../icons/calendar.svg'
import DescIcon from '../icons/page.svg'
import usePosterGenerator from '../service/posterGenerator';
import Placeholder from '../assets/placeholder.png'
import DescriptionModal from './DescriptionModal';
import SearchIcon from '../icons/search.svg'
import EventData from '../eventdata/demoEvent .json'
import EmployeeData from '../eventdata/employeeData.json'

const AddEvent2 = () => {
    const [searchInput, setSearchInput] = useState("")
    const [matchingEvents, setMatchingEvents] = useState([]); // All events that macthes ther search
    const [selectedEvent, setSelectedEvent] = useState(null); // Event that we are selecting and sending to form
    const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false)
    const [isFormBlur, setIsFormBlur] = useState(true)
    const { isLoading, imageUrl, generatePrompt } = usePosterGenerator();
    const [eventName, setEventName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState({
        placeHolder: Placeholder,
        file: null
    });
    const [logoUrl, setLogoUrl] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [employeeMail, setEmployeeMail] = useState("")
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [matchingEmployees, setMatchingEmployees] = useState([])
    const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false)
    const [addedEmployees, setAddedEmployees] = useState([])


    // Will filter the events according to the search event input
    const filterEvents = (event) => {
        return event.tags.includes(searchInput.toLowerCase());
    };
    // Will be called when search icon on input Event will be clicked.
    const handleInputEventChange = () => {
        const matches = EventData.filter(filterEvents);
        setMatchingEvents(matches);
        setIsEventDropdownOpen(true)
    };
    const handleEventClick = (event) => {
        setIsEventDropdownOpen(false)
        setSelectedEvent(event);
    }
    // When the event will get updated, i.e when a event will be selected from the dropdown
    useEffect(() => {
        setEventName(selectedEvent?.name || '');
        setLocation(selectedEvent?.location || '')
        setDescription(selectedEvent?.description || '')
        setStartDate(selectedEvent?.startDate || '')
        setEndDate(selectedEvent?.endDate || '')
        setLogoUrl(selectedEvent?.logo || "")
    }, [selectedEvent]);

    const filterEmployees = (mail) => {
        return mail.id.includes(employeeMail.toLowerCase())
    }
    const handleInputEmailChange = () => {
        // We have to do this, because empty field also gives true
        if (employeeMail.trim() !== '') {
            const matches = EmployeeData.filter(filterEmployees);
            setMatchingEmployees(matches);
            setIsEmployeeDropdownOpen(true)
        } else {
            setMatchingEmployees([]);
        }
    }
    const handleEmployeeClick = (employee) => {
        setIsEmployeeDropdownOpen(false)
        setSelectedEmployee(employee)
        // Check if the email already exists in the addedEmployees list
        const isDuplicate = addedEmployees.some(emp => emp.id === employee.id);
        if (!isDuplicate) {
            // Add the employee to the addedEmployees list
            setAddedEmployees(prevEmployees => [...prevEmployees, employee]);
        }
        // Clear the input field after selection
        setEmployeeMail('');
    }

    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }
    const handleDescription = (value) => {
        setDescription(value)
    }


    const handlePoster = () => {
        generatePrompt(location, description)
    }

    const handleImageChange = (e) => {
        // Handle image upload and set state for image preview
        if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/jpeg') {
    
          // Showing Pewiew of Image
          const reader = new FileReader();
          reader.onload = (event) => {
            setImage({
              placeHolder: event.target.result,
              file: e.target.files[0]
            })
          };
          reader.readAsDataURL(e.target.files[0]);
        } else {
          // toast.error("Wrong Image Type");
          image.file = null;
        }
      };
      useEffect(() => {
        // Update the image state when generatedImage change
        if (imageUrl) {
          setImage({ placeHolder: imageUrl, file: null });
        }
      }, [imageUrl]);
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("clciked")
    }
    return (
        <div className={styles.bodyContainer}>
            <div className={styles.container}>
                <div className={styles.btnContainer}>
                    <div className={styles.heading}>Your Event</div>
                    <button type='button' className={styles.btn}>Add Manually</button>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formFieldsContainer}>
                        <div className={styles.search}>
                            <input
                                type='text'
                                placeholder='Enter Event Url or Search for an Event'
                                onChange={(e) => setSearchInput(e.target.value)}
                                value={searchInput}
                                required
                            />
                            <button type='button' onClick={handleInputEventChange}><img src={SearchIcon} alt='search' /></button>
                            {isEventDropdownOpen && (
                                <div className={styles.dropdown}>
                                    {matchingEvents.map(event => (
                                        <div key={event.id} className={styles.dropdownItem} onClick={() => handleEventClick(event)}>
                                            {event.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.dateContainer}>
                            <div className={styles.dateIconContainer}>
                                <img src={DateIcon} alt='SearchIcon' />
                                <span className={styles.heading}>Dates</span>
                            </div>
                            <div className={styles.input}><RangePicker startDate={startDate} endDate={endDate} /></div>
                        </div>
                        <div className={styles.locationContainer}>
                            <img src={LocationIcon} alt='LocationIcon' />
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required placeholder='Location' />
                        </div>
                        <div className={styles.descContainer} onClick={handleModal}>
                            <img src={DescIcon} alt='DescIcon' />
                            <div className={styles.headingContainer}>
                                <div className={styles.descHeading} >Description</div>
                                {description.length > 0 && <input className={styles.descPara} disabled={true} value={description} />}
                            </div>
                        </div>
                        <div className={styles.employeeContainer}>
                            <div className={styles.employeeIconContainer}>
                                <img src={PeopleIcon} alt='SearchIcon' />
                                <input type="text" value={employeeMail} onChange={(e) => setEmployeeMail(e.target.value)} required placeholder='Add Employee mail' />
                            </div>
                            <button type='button' onClick={handleInputEmailChange}><img src={SearchIcon} alt='search' /></button>
                            {isEmployeeDropdownOpen && (
                                <div className={styles.dropdown}>
                                    {matchingEmployees.map(employee => (
                                        <div key={employee.id} className={styles.dropdownItem} onClick={() => handleEmployeeClick(employee)}>
                                            {employee.id}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.addedEmployees}>
                            {addedEmployees.map(employee => (
                                <div key={employee.id} className={styles.addedEmployee}>
                                    {employee.initials}
                                </div>
                            ))}
                        </div>
                        <button className={styles.submitBtn} type='submit'>Add</button>
                    </div>
                    <div className={styles.formImgContainer}>
                        <div className={styles.btns}>
                            <label onClick={handlePoster}>AI Generate</label>
                            <label htmlFor='fileUpload'>Upload Image</label>
                            <input id='fileUpload' type="file" onChange={handleImageChange}/>
                        </div>
                        <div className={styles.imageHolder}>
                            {isLoading ? (
                                <div className={styles.loader}>
                                    <div></div>
                                </div>
                            ) : (
                                <div>
                                    <img src={image.placeHolder} alt="" />
                                    <div className={styles.imageLocation}>{location}</div>
                                    <img src={logoUrl} alt='logo' className={styles.logo}></img>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
            <div className={`${styles.modal} ${isModalOpen ? styles.modalOpen : ""} `}>
                <DescriptionModal handleModal={handleModal} handleDescription={handleDescription} />
            </div>
        </div>
    )
}

export default AddEvent2