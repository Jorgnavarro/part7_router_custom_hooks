import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {

  const request = axios.get(baseUrl)

  return request.then(response => response.data)

}

const create = async newObject => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const addNewComment = async (newComment) => {
  const {comment, idBlog} = newComment

  const response = await axios.post(`${baseUrl}/${idBlog}/comments`, {comment})

  return response.data
}

const update = async (newObject) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)

  return response.data
}

const deleteBlog = async (id) => {

  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.delete(`${baseUrl}/${id}`, config)

  return request.data

}
export default { getAll, create, update, setToken, deleteBlog, addNewComment }