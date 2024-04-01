import { useState, useEffect } from 'react'
import pService from './services/persons'

import Phonebook from './components/Phonebook'
import Search from './components/Search'
import Form from './components/PersonForm'
import Button from './components/Button'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [search, setSearch] = useState('')

  const dataHook = () => {
    pService.getAllPersons()
      .then(persons => {
        setPersons(persons)
      })
  }

  useEffect(dataHook, [])

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

  const clear = () => {
    setSearch('')
  }

  const handlePersonSubmit = (evt) => {
    evt.preventDefault();
    const personExists = nameExistsOrNot(newName)
    if (!personExists) {
      const nPerson = {
        name: newName, number: newPhoneNumber
      }
      pService.createPerson(nPerson)
        .then(cPerson => {
          setPersons(persons.concat(cPerson));
        })

    }
    else {
      const update = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      if (update) {
        const person = persons.find(person => person.name === newName)
        const pData = {...person, name: newName, number: newPhoneNumber}
        pService.updatePerson(person.id, pData)
          .then(uPerson => setPersons(persons.map(person => person.id !== uPerson.id ? person : uPerson)))
      }
    }
    reset()
  }

  const handlePersonDelete = person => {
    if (window.confirm(`Delete ${person.name}`))
      pService.deletePerson(person.id)
        .then(dPerson => {
          setPersons(persons.filter(person => person.id !== dPerson.id))
        })
  }

  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={search} onInputHandler={handleSearch} />
      <Button text="Clear" onClickHandler={clear} />      
      <h3>Add a new</h3>
      <Form
        name={newName} nameHandler={handleNewPersonInput}
        number={newPhoneNumber} numberHandler={handleNewPhoneNumberInput}
        submitHandler={handlePersonSubmit} />
      <h3>Numbers</h3>
      <Phonebook people={filteredPersons} deleteHandler={handlePersonDelete} />
    </div>
  )
}

export default App
