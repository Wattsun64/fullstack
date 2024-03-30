import Button from "./Button"
import Input from "./Input"

const Form = ({ name, number, nameHandler, numberHandler, submitHandler }) => {
  return (
    <>
      <form>
        <div><Input label="name" value={name} onInputHandler={nameHandler}/></div>
        <div><Input label="number" value={number} onInputHandler={numberHandler} /></div>
        <div><Button text="add" onClickHandler={submitHandler} /></div>
      </form>
    </>
  )
}

export default Form
