import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    error: null
  })
  const [showNotification, setShowNotification] = useState(false)
  const [notificationTimeoutID, setNotificationTimeoutID] = useState(null)

  useEffect(() => {
    personsServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    const nameExists = persons.find(person => person.name === newName)
    if (nameExists) {
      if (window.confirm(`${newName} is already added to your phonebook. Would you like to replace their old number with a new one?`)) {
        const personObject = {
          ...nameExists,
          number: newNumber,
        }
  
        personsServices
          .updatePerson(nameExists.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== nameExists.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotification({
              message: `Updated ${returnedPerson.name}`,
              error: false,
            })
            setShowNotification(true)
            if (notificationTimeoutID) {
              clearTimeout(notificationTimeoutID)
            }
            setNotificationTimeoutID(setTimeout(() => {
              setShowNotification(false)
            }, 3000))
          })
          .catch(error => {
            setNotification({
              message: `Information of ${nameExists.name} has already been removed from the server`,
              error: true,
            })
            setShowNotification(true)
            if (notificationTimeoutID) {
              clearTimeout(notificationTimeoutID)
            }
            setNotificationTimeoutID(setTimeout(() => {
              setShowNotification(false)
            }, 3000))
            setPersons(persons.filter(person => person.id !== nameExists.id))
          })
      }
    } else {
      event.preventDefault()
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      }
  
      personsServices
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification({
            message: `Added ${returnedPerson.name}`,
            error: false,
          })
          setShowNotification(true)
          if (notificationTimeoutID) {
            clearTimeout(notificationTimeoutID)
          }
          setNotificationTimeoutID(setTimeout(() => {
            setShowNotification(false)
          }, 3000))
        })
        .catch(error => {
          setNotification({
            message: `Failed to add ${newName}.`,
            error: true,
          })
          setShowNotification(true)
          if (notificationTimeoutID) {
            clearTimeout(notificationTimeoutID)
          }
          setNotificationTimeoutID(setTimeout(() => {
            setShowNotification(false)
          }, 3000))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDeletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Remove ${person.name} from your phonebook?`)) {
      personsServices
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification({
            message: `Removed ${person.name}`,
            error: false,
          })
          setShowNotification(true)
          if (notificationTimeoutID) {
            clearTimeout(notificationTimeoutID)
          }
          setNotificationTimeoutID(setTimeout(() => {
            setShowNotification(false)
          }, 3000))
        }
      )
    }
  }
  
  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      {showNotification && <Notification message={notification.message} error={notification.type} /> }
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>New entry</h2>
      <PersonForm
        numberValue={newNumber}
        nameValue={newName}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
      <h1>Numbers</h1>
      <Persons 
        persons={personsToShow} 
        onDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App