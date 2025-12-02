import { useState, useEffect } from 'react'

import axios from 'axios'

import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    console.log('fetching persons....')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('data fetched')
        setPersons(response.data)
      })
  }, [])

  const queriedPersons = persons.filter(person => person.name.toLowerCase().includes(searchQuery))

  const handleQueryChange = (event) => setSearchQuery(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    const isPersonSaved = persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())

    if (isPersonSaved) {
      alert(`${newName} is already in the phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      const newEntry = {
        name: newName,
        number: newNumber
      }

    setPersons(persons.concat(newEntry))
    setNewName('')
    setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter query={searchQuery} handleQueryChange={handleQueryChange} />
      <PersonForm name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} addPerson={addPerson} />
      <Persons persons={queriedPersons} />
    </div>
  )
}

export default App