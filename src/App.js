import { useState } from "react"
import MultipleData from "./components/MultipleData"
import SingleData from "./components/SingleData"
import marathon from './images/marathon.png'
import tedx from './images/tedx.png'
import theatre from './images/theatre.jpg'
import './App.css'

const App = () => {
  const [IsModalOpen, SetIsModalOpen] = useState(false)

  // To store the data of the card that is selected, so that we can send this data to modal
  // const [SelectedCardData, SetSelectedCardData] = useState<{}>({})

  // We will fetch the Data from a particular ID of the company for upcoming events.
  // Every event will also have a particular ID which will be passed to the Card

const cardData = [
  { image: marathon, eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
  { image:tedx, eventName: "Ted X", date: "February 3 - 7, 2024", location: "Tokyo, Japan" },
  { image: theatre, eventName: "Andha Yug", date: "February 3 - 7, 2024", location: "Delhi, India" },
  { image: theatre, eventName: "Andha Yug", date: "February 3 - 7, 2024", location: "Delhi, India" },
  { image: theatre, eventName: "Andha Yug", date: "February 3 - 7, 2024", location: "Delhi, India" },
  { image: marathon, eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
  { image: marathon, eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
  { image: marathon, eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
  { image: marathon, eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" }
]

  const handleModal = (IsOpen) => {
    SetIsModalOpen(IsOpen)
  }
  const layout = document.currentScript.getAttribute('data-layout');
  return (
    <div className="container">
      {cardData.length === 1 
        ? <SingleData cardData={cardData} /> 
          : <MultipleData cardData={cardData} layout={layout}/>
      }
    </div>
  );
}

export default App