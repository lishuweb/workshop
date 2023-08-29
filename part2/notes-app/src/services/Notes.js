import axios from "axios";

const baseUrl = "/api/notes";

const getAll = () => {
  return axios.get(baseUrl)
  .then((result) => result.data);
};

const create = (note, token) => {
  return axios.post(baseUrl, note, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const update = (id, updatedNote) => {
  return axios.put(`${baseUrl}/${id}`, updatedNote);
};

const functionName = {create, getAll, update};

export default functionName;
