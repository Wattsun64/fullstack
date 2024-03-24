import Person from "./Person";

const Phonebook = ({ people }) => {
  return (
    <>
      {people.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </>
  )
}

export default Phonebook
