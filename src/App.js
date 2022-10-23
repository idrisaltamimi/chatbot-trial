import React, { useState, useRef, useEffect } from 'react'
import uuid from 'react-uuid'
import steps from './data.json'

export default function App() {
  const [trigger, setTrigger] = useState(steps[0].id)
  const [userMessage, setUserMessage] = useState("")
  const [allMessages, setAllMessages] = useState([])
  const inputRef = useRef(null)
  const currentStepData = steps.find(({ id }) => id === trigger)

  const handleChange = (event) => {
    setUserMessage(event.target.value)
  }

  const addMessage = (event) => {
    event.preventDefault()
    setAllMessages(prev => [...prev, userMessage])
    setTrigger(currentStepData.trigger)
    // setUserMessage("")
    inputRef.current.focus()
  }

  useEffect(() => {
    console.log(currentStepData.options)
    if (currentStepData.user) return
    // else if (currentStepData.options) {
    //   const { options } = currentStepData
    //   setTimeout(() => {
    //     const message = options.map(item => <p key={uuid()}>{item.label}</p>)
    //     setAllMessages(prev => [...prev, message])
    //     setTrigger(currentStepData.trigger)
    //   }, 1000)
    // }
    setTimeout(() => {
      let message = currentStepData.message
      if (currentStepData.message.includes('{previousValue}')) {
        message = currentStepData.message.replace('{previousValue}', userMessage)
      }
      setAllMessages(prev => [...prev, message])
      setTrigger(currentStepData.trigger)
    }, 1000)
  }, [currentStepData, userMessage])

  return (
    <div>
      {allMessages.map(message => <p key={uuid()}>{message}</p>)}
      <form>
        <input ref={inputRef} type="text" name="todo" value={userMessage} onChange={handleChange} />
        <button onClick={addMessage}>send</button>
      </form>
    </div>
  )
}
