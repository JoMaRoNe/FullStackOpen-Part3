import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initalPersons => {
        setPersons(initalPersons)
      })

  }, [])

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }
    
    const setColor = message.includes('removed') ? 'red' : 'green'
    
    const notificationStyle = {
      color: setColor,
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }


  const addPerson = (event) => {
      event.preventDefault ()
      const personObject = {
        name: newName,
        number: newNumber
      }

      const changePerson = (id) => {
        const person = persons.find(p => p.id === id)
        const changedPerson = { ...person, number: newNumber }
        personService
        .update(id,changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id === id ? returnedPerson : p))
          setNewName('')
          setNewNumber('')
          setNotification (`${person.name} has been modified.`)
          setTimeout (() => {
            setNotification(null)
          },5000)
        })
        .catch(error => {
          setNotification(`Information of ${changedPerson.name} has already been removed from server`)
          setTimeout (() => {
            setNotification(null)
          },5000)
          setPersons(persons.filter((p) => p.id != id))
        }) 
      }

      persons.some(person => person.name === newName)
        ? window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)
          ? changePerson(persons.find(person => person.name === newName).id)
          : console.log('Cancelled')
        : personService
            .create(personObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
            })
            setNotification(`Added ${personObject.name}`)
            setTimeout (() => { 
              setNotification(null)
            },5000)
  }


  const removePerson = (name,id) => {
      personService.remove(id)
      setPersons(persons.filter((p) => p.id != id))
      setNotification(`Deleted ${name}.`)
      setTimeout (() => { 
        setNotification(null)
      },5000)
  }
    
  const handlePersonChange = (event) => {
      setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }
  const [newSearch,setNewSearch] = useState('')
  
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleClick = (name, id) => {
    const r = window.confirm(`Delete ${name}?`)
        ? removePerson(name,id)
        : console.log("cancelled")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter search={newSearch} handle={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm 
        add={addPerson}
        name={newName}
        handleP={handlePersonChange}
        number={newNumber}
        handleN={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} search={newSearch} handle={handleClick}/>
    </div>
  )
}

export default App