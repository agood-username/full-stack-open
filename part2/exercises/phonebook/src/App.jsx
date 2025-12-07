import { useState, useEffect } from 'react'

import personService from './services/persons'

import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('fetching persons....')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('data fetched')
        setPersons(initialPersons)
      })
  }, [])

  const queriedPersons = persons.filter(person => person.name.toLowerCase().includes(searchQuery))

  const handleQueryChange = (event) => setSearchQuery(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const notify = (message, duration) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, duration)
  }

  const createPerson = (name, number) => {
    const newEntry = {name, number}

    personService
      .create(newEntry)
      .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          notify(`Information about ${newEntry.name} successfully added to phonebook.`, 3000)
        })
      .catch(error => {
        notify(error.response.data.error, 5000)
      })
    }

  const updatePersonNumber = (person, number) => {
    const updatedPerson = {...person, number}

    console.log(`updating ${person.name} number to ${newNumber}`) 
    personService
        .update(person.id, updatedPerson)
        .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            notify(`${person.name} number successfully updated.`, 3000)
          })
        .catch(error => {
          notify(error.response.data.error, 5000)
        })
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (!personExists) {
      createPerson(newName, newNumber)
      setNewName('')
      setNewNumber('')
      return
    }

    const isNumberDifferent = personExists.number !== newNumber

    if (isNumberDifferent) {
      const confirmation = window.confirm(`${personExists.name} is already in the phonebook, replace the old number with a new one?`)

      if (confirmation) {
          updatePersonNumber(personExists, newNumber)
        }

        setNewName('')
        setNewNumber('')
        return
      } 
        
      alert(`${newName} is already in the phonebook`)
      setNewName('')
      setNewNumber('')
  }

  const deletePerson = (id) => {
    const selectedPerson = persons.find(person => person.id === id)
    const confirmation = window.confirm(`Remove ${selectedPerson.name} from the phonebook?`)

    if (confirmation) {
      console.log('deleting', selectedPerson)
      personService
        .remove(selectedPerson)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.filter((person) => person.id !== id))
          notify(`Information about ${selectedPerson.name} successfully deleted.`, 3000)
          
        })
        .catch(() => {
          notify(`Information about ${selectedPerson.name} is already removed from server`, 5000)
          setPersons(prev => prev.filter((person) => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <SearchFilter query={searchQuery} handleQueryChange={handleQueryChange} />
      <PersonForm name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} addPerson={addPerson} />
      <Persons persons={queriedPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App