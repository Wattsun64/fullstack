import { useState } from 'react'

import Phonebook from './components/Phonebook'
import Search from './components/Search'
import Form from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [search, setSearch] = useState('')

  const handleNewPersonInput = (evt) => {
    setNewName(evt.target.value)
  }

  const handleNewPhoneNumberInput = (evt) => {
    setNewPhoneNumber(evt.target.value)
  }

  const handleSearch = (evt) => {
    setSearch(evt.target.value)
  }

  const nameExistsOrNot = (name) => {
    return persons.filter(person => person.name.toLocaleLowerCase() == name.toLocaleLowerCase()).length > 0
  }

  const reset = () => {
    setNewName('')
    setNewPhoneNumber('')
  }

  const handlePersonSubmit = (evt) => {
    evt.preventDefault();
    if (!nameExistsOrNot(newName))
      setPersons(persons.concat({name: newName, number: newPhoneNumber}))
    else 
      window.alert(`${newName} is already added to phonebook`)
    reset()
  }

  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={search} onInputHandler={handleSearch} />
      <h3>Add a new</h3>
      <Form
        name={newName} nameHandler={handleNewPersonInput}
        number={newPhoneNumber} numberHandler={handleNewPhoneNumberInput}
        submitHandler={handlePersonSubmit} />
      <h3>Numbers</h3>
      <Phonebook people={filteredPersons} />
    </div>
  )
}

export default App
