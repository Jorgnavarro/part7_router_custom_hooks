import { useEffect, useContext, useState } from 'react'
import { ContextGlobal } from './context/globalContext'
import blogService from './services/blog'
import userService from './services/user'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { HeaderUserInfo } from './components/HeaderUserInfo'
import { AddBlogForm } from './components/AddBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getLoggedUser } from './reducers/userReducer'



function App() {
  const [userDDBB, setUserDDBB] = useState({})
  const { blogs, setBlogs } = useContext(ContextGlobal)
  const user = useSelector(state => state.userLogin)
  const userId = useSelector(state => state.userData)
  console.log(userId)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getLoggedUser())
  }, [dispatch])

  const blogList = useSelector(state => {
    return state.blogs
  })


  const sortByLikes = () => {
    const arrSort = [...blogs]
    arrSort.sort((a,b) => {
      return b.likes - a.likes
    })
    setBlogs(arrSort)
  }





  return (
    <div className='container containerBlogs'>
      <h1 className='text-center mt-3 mb-5'>Blogs 🗒️</h1>
      <Notification/>
      {userId === null ? <LoginForm/> : <HeaderUserInfo/> }
      {userId && <AddBlogForm/>}
      {userId && <button onClick={sortByLikes} className="btn btn-outline-success mb-2">Sort by likes</button>}
      {userId && <ul className='list-group' id='initialList'>
        {blogList.map(blog => {
          return <Blog key={blog.id} blog={blog} userId={userId}/>
        })}
      </ul>}
    </div>
  )
}

export default App
