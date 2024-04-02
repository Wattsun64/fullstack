import { useState, useEffect } from 'react'
import pService from './services/persons'

import Phonebook from './components/Phonebook'
import Search from './components/Search'
import Form from './components/PersonForm'
import Button from './components/Button'
import Success from './components/Success'
import Error from './components/Error'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [search, setSearch] = useState('')
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const dataHook = () => {
    pService.getAllPersons()
      .then(persons => {
        setPersons(persons)
      })
  }

  useEffect(dataHook, [])

  const successNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg(null)
    }, 5000)
  }

  const errorNotification = (msg) => {
    setErrorMsg(msg)
    setTimeout(() => {
      setErrorMsg(null)
    }, 5000)
  }

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
          successNotification(`Added ${cPerson.name}`)
        })

    }
    else {
      const update = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      if (update) {
        const person = persons.find(person => person.name === newName)
        const pData = {...person, name: newName, number: newPhoneNumber}
        pService.updatePerson(person.id, pData)
          .then(uPerson => {
            setPersons(persons.map(person => person.id !== uPerson.id ? person : uPerson))
            successNotification(`${uPerson.name}'s number has been updated to ${uPerson.number}`)
          })
          .catch(err => {
            errorNotification(`Information of ${person.name} has been removed from server`)
            setPersons(persons.filter(p => p.id !== person.id))
          })
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
      <h1>Phonebook</h1>
      <Success message={successMsg} />
      <Error message={errorMsg} />
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
