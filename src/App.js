import { useState } from "react"
import MultipleData from "./components/MultipleData"
import SingleData from "./components/SingleData"

const App = () => {
  const [IsModalOpen, SetIsModalOpen] = useState(false)

  // To store the data of the card that is selected, so that we can send this data to modal
  // const [SelectedCardData, SetSelectedCardData] = useState<{}>({})

  // We will fetch the Data from a particular ID of the company for upcoming events.
  // Every event will also have a particular ID which will be passed to the Card
  const cardData = [
  { image: "/marathon.png", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
  { image: "/tedx.png", eventName: "Ted X", date: "February 3 - 7, 2024", location: "Tokyo, Japan" },
  { image: "/theatre.jpg", eventName: "Andha Yug", date: "February 3 - 7, 2024", location: "Delhi, India" },
  { image: "/theatre.jpg", eventName: "Andha Yug", date: "February 3 - 7, 2024", location: "Delhi, India" },
  { image: "/theatre.jpg", eventName: "Andha Yug", date: "February 3 - 7, 2024", location: "Delhi, India" },
  { image: "/marathon.png", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
  { image: "/marathon.png", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
  { image: "/marathon.png", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
  { image: "/marathon.png", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" }
]

  const handleModal = (IsOpen) => {
    SetIsModalOpen(IsOpen)
  }
  return (
    <div>
      {cardData.length === 1 
        ? <SingleData cardData={cardData} /> 
          : <MultipleData cardData={cardData}/>
      }
    </div>
  );
}

export default App