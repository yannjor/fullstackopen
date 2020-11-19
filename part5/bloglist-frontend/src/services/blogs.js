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
  const response = await axios.post(baseUrl, newPost, {
    headers: { Authorization: token }
  });
  return response.data;
};

const update = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog);
  return response.data;
};

const remove = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: token }
  });
  return response.data;
};

export default { getAll, setToken, post, update, remove };
