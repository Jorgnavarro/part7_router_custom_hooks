import { useParams } from 'react-router-dom'

/* eslint-disable react/prop-types */
const BlogsUser = ({uBlogs}) => {
    const id = useParams().id

    const userBlogs = uBlogs.find(u => {
        if(u.user.id === id){
            return u?.user?.name
        }
    })


    return(
        <div className='mt-4'>
            <h3 className='text-center'>{userBlogs.user.name}</h3>
            <h4>Added blogs</h4>
            <ul>
                {uBlogs.map(blog => {
                    return <li key={blog.id}>
                        {blog.title}
                    </li>
                })}
            </ul>
        </div>
    )
}

export default BlogsUser