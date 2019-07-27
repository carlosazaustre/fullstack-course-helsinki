import axios from 'axios';
const baseUrl = '/api/blogs';

// eslint-disable-next-line no-unused-vars
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const unsetToken = () => {
  token = null;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (data) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(
    `${baseUrl}/${data.id}`,
    data,
    config,
  );
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.delete(
    `${baseUrl}/${id}`,
    config,
  );
  return response.data;
}

export default {
  setToken,
  unsetToken,
  getAll,
  create,
  update,
  remove,
};
