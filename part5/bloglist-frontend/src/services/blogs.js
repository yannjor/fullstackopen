import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const post = async (newPost) => {
  console.log(token);
  const response = await axios.post(baseUrl, newPost, {
    headers: { Authorization: token }
  });
  return response.data;
};

export default { getAll, setToken, post };
