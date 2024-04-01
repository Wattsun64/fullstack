import Person from "./Person";

const Phonebook = ({ people, deleteHandler }) => {
  return (
    <>
      {people.map(
        person => <Person key={person.name} name={person.name} number={person.number} onClickHandler={() => { deleteHandler(person) }} />
      )}
    </>
  )
}

export default Phonebook
