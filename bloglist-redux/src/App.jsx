import { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { HeaderUserInfo } from './components/HeaderUserInfo'
import { AddBlogForm } from './components/AddBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, sortByLikesR } from './reducers/blogReducer'
import { getLoggedUser } from './reducers/userReducer'
import userService from './services/user'
import blogService from './services/blog'



function App() {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.userData)
  const userLog = useSelector(state => state.userLogin)
  const blogList = useSelector(state => state.blogs)
  console.log(blogList)
  console.log(userData)
  console.log(userLog)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    async function getLocalUser (){
      const loggedUserJSON = window.localStorage.getItem('loggedUserBlogs')
      const userToSearch = JSON.parse(loggedUserJSON)
      if(userToSearch){
        const response = await userService.getUser(userToSearch.username)
        dispatch(getLoggedUser(response[0]))
        blogService.setToken(userToSearch.token)
      }

    }
    getLocalUser()
  }, [dispatch])



  const sortByLikes = () => {
    const arrSort = [...blogList]
    arrSort.sort((a,b) => {
      return b.likes - a.likes
    })
    dispatch(sortByLikesR(arrSort))
  }





  return (
    <div className='container containerBlogs'>
      <h1 className='text-center mt-3 mb-5'>Blogs 🗒️</h1>
      <Notification/>
      {userLog === null ? <LoginForm/> : <HeaderUserInfo/> }
      {userLog && <AddBlogForm/>}
      {userLog && <button onClick={sortByLikes} className="btn btn-outline-success mb-2">Sort by likes</button>}
      {userLog && <ul className='list-group' id='initialList'>
        {blogList.map(blog => {
          return <Blog key={blog.id} blog={blog} />
        })}
      </ul>}
      <Notification className='mt-5'/>
    </div>
  )
}

export default App
