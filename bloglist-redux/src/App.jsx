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


function App() {
  const [userDDBB, setUserDDBB] = useState({})
  const { blogs, setBlogs, setUser, user } = useContext(ContextGlobal)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogList = useSelector(state => {
    return state.blogs
  })

  console.log(blogList)



  // useEffect(() => {
  //   blogService.getAll()
  //     .then(initialBlogList => {
  //       setBlogs(initialBlogList)
  //     })
  // }, [setBlogs, modifierLikes])

  // console.log(blogs)



  const sortByLikes = () => {
    const arrSort = [...blogs]
    arrSort.sort((a,b) => {
      return b.likes - a.likes
    })
    setBlogs(arrSort)
  }


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserBlogs')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[setUser])

  useEffect( () => {
    async function getLocalUser (){
      try{
        const loggedUserJSON = window.localStorage.getItem('loggedUserBlogs')
        const userToSearch = JSON.parse(loggedUserJSON)
        if(userToSearch !== null){
          const response = await userService.getUser(userToSearch.username)
          setUserDDBB(response[0].id)
        }else{
          throw('User it is not ready')
        }
      }catch(e){
        console.log(e)
      }
    }
    getLocalUser()

  },[user])



  return (
    <div className='container containerBlogs'>
      <h1 className='text-center mt-3 mb-5'>Blogs 🗒️</h1>
      <Notification/>
      {user === null ? <LoginForm/> : <HeaderUserInfo/> }
      {user && <AddBlogForm/>}
      {user && <button onClick={sortByLikes} className="btn btn-outline-success mb-2">Sort by likes</button>}
      {user && <ul className='list-group' id='initialList'>
        {blogList.map(blog => {
          return <Blog key={blog.id} blog={blog} userDDBB={userDDBB}/>
        })}
      </ul>}
    </div>
  )
}

export default App
