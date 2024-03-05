import { useState } from "react"
import MultipleData from "./components/MultipleData"
import SingleData from "./components/SingleData"
import marathon from './images/marathon.png'
import tedx from './images/tedx.png'
import theatre from './images/theatre.jpg'
import './App.css'

const App = ({layout, theme}) => {
  const [IsModalOpen, SetIsModalOpen] = useState(false)

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
  return (
    <div className="container">
      {cardData.length === 1 
        ? <SingleData cardData={cardData} /> 
          : <MultipleData cardData={cardData} layout={layout} theme={theme}/>
      }
    </div>
  );
}

export default App