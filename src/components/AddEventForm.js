import React, { useState, useEffect } from 'react'
import styles from './addeventform.style.module.css'
import RangePicker from './RangePicker';
import LocationIcon from '../icons/location.svg'
import DateIcon from '../icons/calendar.svg'
import DescIcon from '../icons/page.svg'
import Placeholder from '../assets/placeholder.png'
import { GoogleGenerativeAI } from "@google/generative-ai";

const AddEventForm = (props) => {
  // Defining the States
  const [id, setId] = useState('');
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState({
    placeHolder: Placeholder,
    file: null
  });
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  // We need to make a re render, else it wont show the changes in the form
  useEffect(() => {
    setEventName(props.selectedEvent?.name || '');
    setLocation(props.selectedEvent?.location || '')
    setDescription(props.selectedEvent?.description || '')
  }, [props.selectedEvent]);


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
      toast.error("Wrong Image Type");
      image.file = null;
    }

  };

  const generatePrompt = async () => {
    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Location is ${location}. Description is ${description}. Generate a prompt without pointers for stable diffusion to generate a NICE ILLUSTRATION PAINTING/ART for the given location and description.`
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = await response.text();
      setPrompt(text);
      console.log(text)
    } catch (error) {
      console.error("Error generating prompt:", error);
    }
  }
  useEffect(() => {
    generatePoster()
  }, [prompt])

  const generatePoster = async () => {
    const apiKey = process.env.REACT_APP_RUNPOD_API_KEY;
    if (prompt) {
      setIsLoading(true);
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: apiKey
        },
        body: JSON.stringify({
          input: {
            prompt,
            num_inference_steps: 25,
            refiner_inference_steps: 50,
            width: 1024,
            height: 1024,
            guidance_scale: 7.5,
            strength: 0.3,
            seed: null,
            num_images: 1
          }
        })
      };
      try {
        const response = await fetch('https://api.runpod.ai/v2/sdxl/runsync', options);
        const responseData = await response.json();
        console.log(responseData);
        setImage({ placeHolder: responseData.output.image_url, file: null });
      } catch (error) {
        console.error("Error generating poster:", error);
      }
      setIsLoading(false);
      setPrompt(""); // Clear prompt after generating the poster
    }
  }


  const handleSubmit = (e) => {
    // Calling 12 hr format time method
    e.preventDefault();

    // Fetching existing data from local storage
    const existingData = JSON.parse(localStorage.getItem('newEvent')) || [];
    // Creating new object with entered fields
    const newEvent = {
      id: existingData.length + 1,
      eventName,
      startDate,
      endDate,
      location,
      image
    };

    // Updated data with new field
    const updatedData = [...existingData, newEvent]

    toast.success("Event Listed");

    // Storing data in local storage
    localStorage.setItem('newEvent', JSON.stringify(updatedData));

    // Setting all the fields to empty values
    setId("");
    setEventName("");
    setEndDate("")
    setStartDate("");
    setLocation("");
    setImage({
      placeHolder: defaultImage,
      file: null
    })
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.leftform}>
          <div className="">
            <input type="text" className={styles.eventname} value={eventName} onChange={(e) => setEventName(e.target.value)} required placeholder='Event Name' />
          </div>
          <div className={styles.dateContainer}>
            <div className={styles.dateIconContainer}>
              <img src={DateIcon} alt='SearchIcon' />
              <span className={styles.heading}>Add Date</span>
            </div>
            <div className={styles.input}><RangePicker /></div>
          </div>
          <div className={styles.locationContainer}>
            <img src={LocationIcon} alt='LocationIcon' />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required placeholder='Location' />
          </div>
          <div className={styles.descContainer}>
            <img src={DescIcon} alt='DescIcon' />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required placeholder='Description' />
          </div>
          <button type="submit" className={styles.submitBtn}>ADD EVENT</button>
        </div>
        <div className={styles.imageContainer}>
          <label className={styles.imagetext}>Upload / Generate Poster</label>
          {/* <input className={styles.promptInput} value={prompt} placeholder='Enter The Prompt' onChange={(e) => setPrompt(e.target.value)} /> */}
          <div className={styles.btns}>
            <button type='button' onClick={generatePrompt}>Generate Poster</button>
            <input type="file" onChange={handleImageChange} />
          </div>
          {isLoading ? (
            <div className={styles.loader}>
              <div></div>
            </div>
          ) : (
            <img src={image.placeHolder} alt="" />
          )}
        </div>
      </form>
    </div>
  )
}


export default AddEventForm