const Input = ({ onInputHandler, value, label }) => {
  return (
    <>
      {label}: <input type="text" onInput={onInputHandler} value={value} />
    </>
  )
}
export default Input
