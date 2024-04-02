const Success = ({ message }) => {
  const styles = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  }
  if (!message)
    return null
  return (
    <p style={styles}>{message}</p>
  )
}
export default Success
