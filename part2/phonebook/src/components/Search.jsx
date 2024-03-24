import Input from "./Input"

const Search = ({ value, onInputHandler }) => {
  return (
    <>
      <Input label="filter shown with" value={value} onInputHandler={onInputHandler} />
    </>
  )
}

export default Search
