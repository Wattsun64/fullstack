const Person = ({ name, number, onClickHandler }) => {
  return (
    <p>
      {name} {number}
      <button onClick={onClickHandler}>delete</button>
    </p>
  )
}

export default Person
