import blogService from './services/blog'
import Swal from 'sweetalert2'




export const getBlogs = () => blogService.getAll().then(response => response)

export const createBlog = newBlog => blogService.create(newBlog).then(response => response)

export const updateLikes = (blog) => blogService.update(blog).then(response => response)
.catch(error => 
       Swal.fire({
        icon: 'error',
        title: `${error.message} - Please log in again`,
        showConfirmButton: false,
        timer: 2000,
       })                                 
                                        
)