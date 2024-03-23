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
  const { blogs, setBlogs } = useContext(ContextGlobal)
  const userInfoLog = useSelector(state => {
    if(state.userLogin.length === undefined){
      return null
    }else{
      return state.userLogin
    }
  })
  const userData = useSelector(state => state.userData)
  console.log(userData)
  console.log(userInfoLog)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getLoggedUser())
  }, [dispatch])

  const blogList = useSelector(state => {
    return state.blogs
  })


  const sortByLikes = () => {
    const arrSort = [...blogList]
    arrSort.sort((a,b) => {
      return b.likes - a.likes
    })
    setBlogs(arrSort)
  }





  return (
    <div className='container containerBlogs'>
      <h1 className='text-center mt-3 mb-5'>Blogs 🗒️</h1>
      <Notification/>
      {userInfoLog === null ? <LoginForm/> : <HeaderUserInfo/> }
      {userInfoLog && <AddBlogForm/>}
      {userInfoLog && <button onClick={sortByLikes} className="btn btn-outline-success mb-2">Sort by likes</button>}
      {userInfoLog && <ul className='list-group' id='initialList'>
        {blogList.map(blog => {
          return <Blog key={blog.id} blog={blog} userData={userData}/>
        })}
      </ul>}
    </div>
  )
}

export default App
