/* eslint-disable react/prop-types */
import Swal from 'sweetalert2'
import { useState, useContext } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateLikes, deletedABlog } from "../requests"
import { useNavigate } from "react-router-dom"
import { ContextGlobal } from "../context/globalContext"

const BlogView = ({ blogView }) => {
    const [like, setLike] = useState(blogView?.likes)
    const [comment, setComment] = useState('')
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { userDDBB } = useContext(ContextGlobal)

    const updateBlogMutation = useMutation({
        mutationFn: updateLikes,
        onSuccess: (blogUpdated) => {
            console.log(blogUpdated?.response?.status)
            if(blogUpdated?.response?.status !== 401){
                const blogs = queryClient.getQueryData(['blogs'])
                const updatedList = blogs.map(blog => {
                    return blog.id === blogUpdated.id ? blogUpdated : blog
                })
                setLike((prevLike) => prevLike + 1)
                queryClient.setQueryData(['blogs'], updatedList)
            }
        }
    })

    const deletedABlogMutation = useMutation({
        mutationFn: deletedABlog,
        onSuccess: (response) => {
            if(response?.response?.status !== 401){
                console.log(blogView.id)
                const blogs = queryClient.getQueryData(['blogs'])
                const updatedList = blogs.filter(b => b.id !== blogView.id)
                queryClient.setQueryData(['blogs'], updatedList)
                navigate('/')
                }
        }
    })

    const handleDeleteBlog = (id) => {
        Swal.fire({
            title: `Are you sure to delete ${blogView.title} from your blogs?`,
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              deletedABlogMutation.mutate(id)
            }
          })
    }


    const handleLikes = () => {
        const blogUpdated = {
            ...blogView,
            likes: like + 1
        }
        updateBlogMutation.mutate({...blogUpdated})
    }

    const returnHome = () => {
        navigate("/")
    }
    console.log(blogView)
    //agregamos los signos de interrogación para cuando se elimine el blog no arroje ningún error por consola al estar undefined.

    const handleComments = (e) => {
        e.preventDefault()
        console.log(comment)
        console.log(blogView.id)
    }

    return(
        <div className="containerViewBlog">
            <h2>{blogView?.title}</h2>
            <a className="linkFake" href="">{blogView?.url}</a>
            <div>
            {like} likes <button className="btn btn-outline-primary likeTest" onClick={handleLikes}>Like</button>
            </div>
            <h4>Added by: {blogView?.author}</h4>
            <div className="containerBtnsView">
                <button className="btn btn-outline-light" onClick={returnHome}>Go back</button>
                {blogView?.user?.id === userDDBB || blogView?.user === userDDBB ? <button className="btn btn-outline-danger" onClick={() => handleDeleteBlog(blogView?.id)}>Remove</button> : ""}
            </div>
            <h3>Comments</h3>
            <form className='containerComments' onSubmit={handleComments}>
                <div className="mb-3 row align-items-center infoBlog">
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="comment"
                        value={comment}
                        onChange={({ target }) => setComment(target.value)}
                      />
                    </div>
                    <div className="align-self-center col-3">
                    <button className="btn btn-outline-light" type='submit'>Add comment</button>
                </div>
                </div>
            </form>
            {blogView?.comments === null || blogView?.comments.length === 0 ? '' : 
            <>
            {blogView?.comments.map(comment => {
                return <li key={comment?._id}>
                    {comment?.comment}
                </li>
            })}
            </> }
        </div>
    )
}


export default BlogView