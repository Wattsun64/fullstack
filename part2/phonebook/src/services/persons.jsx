import axios from "axios";

const base = "http://localhost:3001/persons";

const getAllPersons = () => {
  const request = axios.get(base);
  return request.then(resp => resp.data);
}

const createPerson = person => {
  const request = axios.post(base, person);
  return request.then(resp => resp.data);
}

const updatePerson = (pid, pData) => {
  const request = axios.put(`${base}/${pid}`, pData);
  return request.then(resp => resp.data);
}

const deletePerson = pid => {
  const request = axios.delete(`${base}/${pid}`);
  return request.then(resp => resp.data);
}

export default {
  getAllPersons, createPerson, updatePerson, deletePerson
}
