import axios from "axios";

const baseUrl = "/api/notes";

export const getAll = () => {
  return axios.get(baseUrl)
  .then((result) => result.data);
};

const create = (note) => {
  return axios.post(baseUrl, note);
};

const update = (id, updatedNote) => {
  return axios.put(`${baseUrl}/${id}`, updatedNote);
};

const functionName = {create, getAll, update}
export default functionName;
