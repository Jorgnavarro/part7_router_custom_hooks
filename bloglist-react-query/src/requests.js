import blogService from './services/blog'
import Swal from 'sweetalert2'




export const getBlogs = () => blogService.getAll().then(response => response)

export const createBlog = newBlog => blogService.create(newBlog).then(response => response)

export const updateLikes = (blog) => blogService.update(blog).then(response =>{ 
      Swal.fire({
       icon: 'success',
       title: `The blog - ${blog.title} - was voted ✅`
      }) 
       return response
})
.catch(error => {
       Swal.fire({
              icon: 'error',
              title: `${error.message} - Please log in again`,
              showConfirmButton: false,
              timer: 2000,
       })    
       return error
       }
) 

export const deletedABlog = (id) => blogService.deleteBlog(id).then(response => {
       Swal.fire({
              icon: 'success',
              title: 'The blog has been deleted successfully',
            })
       return response
})
.catch(error => {
       Swal.fire({
              icon: 'error',
              title: `${error.message} - Please log in again`,
              showConfirmButton: false,
              timer: 2000,
       })
       return error
})