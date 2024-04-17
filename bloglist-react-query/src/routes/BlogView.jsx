/* eslint-disable react/prop-types */

import { useState, useContext } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateLikes, deletedABlog } from "../requests"
import { useNavigate } from "react-router-dom"
import { ContextGlobal } from "../context/globalContext"

const BlogView = ({ blogView }) => {
    const [like, setLike] = useState(blogView.likes)
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

    return(
        <div className="containerViewBlog">
            <h2>{blogView.title}</h2>
            <a className="linkFake" href="">{blogView.url}</a>
            <div>
            {like} likes <button className="btn btn-outline-primary likeTest" onClick={handleLikes}>Like</button>
            </div>
            <h4>Added by: {blogView.author}</h4>
            <div className="containerBtnsView">
                <button className="btn btn-outline-light" onClick={returnHome}>Go back</button>
                {blogView.user?.id === userDDBB || blogView.user === userDDBB ? <button className="btn btn-outline-danger">Remove</button> : ""}
            </div>
        </div>
    )
}


export default BlogView