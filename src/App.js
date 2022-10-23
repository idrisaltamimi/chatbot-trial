import React, { useState, useRef, useEffect } from 'react'
import uuid from 'react-uuid'
import steps from './data.json'

export default function App() {
  const [trigger, setTrigger] = useState(null)
  const [userMessage, setUserMessage] = useState('')
  const [allMessages, setAllMessages] = useState([])
  const inputRef = useRef(null)
  const currentStepData = steps.find(({ id }) => id === trigger)

  const handleChange = (event) => {
    setUserMessage(event.target.value)
  }

  const addMessage = (event) => {
    event.preventDefault()
    setAllMessages(prev => [...prev, userMessage])
    if (currentStepData.trigger.includes('{previousValue}')) {
      return setTrigger(userMessage)
    }
    setTrigger(currentStepData.trigger)
  }

  useEffect(() => setTrigger(steps[0].id), [])

  useEffect(() => {
    if (trigger === null) return
    else if (currentStepData.user === true) {
      return inputRef.current.focus()
    }
    setTimeout(() => {
      let message = currentStepData.message
      if (currentStepData.message.includes('{previousValue}')) {
        message = currentStepData.message.replace('{previousValue}', userMessage)
      }
      else if (typeof message === 'object') {
        return message.map(item => {
          setAllMessages(prev => [...prev, item.label])
          return setTrigger(currentStepData.trigger)
        })
      }
      setAllMessages(prev => [...prev, message])
      setTrigger(currentStepData.trigger)
    }, 1000)
  }, [currentStepData, userMessage, trigger])

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
