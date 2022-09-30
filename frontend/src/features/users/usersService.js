import axios from 'axios'

const API_URL = '/api/users/'

//Get a user
const getUser = async(userId,token) => {

  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.get(API_URL+ userId, config);

  return response.data.data;
}

//Delete user
const deleteUser = async(userId,token) => {

  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.delete(API_URL+ userId, config);

  return response.data.data;
}

//Add user
const addUser = async(userData,token) => {

  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.post(API_URL, userData, config);

  return response.data.data;
}

//Get all users
const getAll = async(token) => {

  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.get(API_URL, config);

  return response.data.data;
}


const usersService = {
  getUser,
  getAll,
  addUser,
  deleteUser
}

export default usersService