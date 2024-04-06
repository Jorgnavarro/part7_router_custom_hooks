import blogService from './services/blog'




export const getBlogs = () => blogService.getAll().then(response => response)

export const createBlog = newBlog => blogService.create(newBlog).then(response => response)

export const updateLikes = (blog) => blogService.update(blog).then(response => response.data)
                                        .catch(error => console.log("Here  error notifications"))