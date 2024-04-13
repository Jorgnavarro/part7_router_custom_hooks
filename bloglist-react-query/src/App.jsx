import { useEffect, useContext } from 'react'
import { ContextGlobal } from './context/globalContext'
import blogService from './services/blog'
import userService from './services/user'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { HeaderUserInfo } from './components/HeaderUserInfo'
import { AddBlogForm } from './components/AddBlogForm'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBlogs } from './requests'
import { NotificationContextProvider } from './context/notificationContext'
import { Routes, Route, useMatch } from 'react-router-dom'
import { UsersList } from './routes/UsersList'


function App() {
  const { setUser, user, setUserDDBB } = useContext(ContextGlobal)

  const queryClient = useQueryClient()

  const match = useMatch('/users/:id')


  const sortByLikes = () => {
    const blogsList = queryClient.getQueryData(['blogs'])
    const arrSort = [...blogsList]
    arrSort.sort((a,b) => {
      return b.likes - a.likes
    })
    queryClient.setQueryData(['blogs'], arrSort)
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

  },[user, setUserDDBB])



  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    refetchOnWindowFocus: false
  })

  if(result.isLoading){
    return <div>Loading data...</div>
  }

  const blogsQuery = result.data

  


  console.log(JSON.parse(JSON.stringify(result)))


  return (
    <NotificationContextProvider>
      <div className='container containerBlogs'>
        <h1 className='text-center mt-3 mb-5'>Blogs 🗒️</h1>
        <Notification/>
        {user === null ? <LoginForm/> : <HeaderUserInfo/>}
        <Routes>
          <Route path='/users' element={<UsersList/>}/>
          <Route path='/' element={(user && <AddBlogForm/>) ? 
          <>
          <button onClick={sortByLikes} className="btn btn-outline-success mb-2">Sort by likes</button>

          <ul className='list-group' id='initialList'>
          {blogsQuery?.map(blog => {
            return <Blog key={blog.id} blog={blog}/>
          })}
          </ul> 
          </>
          : ''}/>
        </Routes>
        <Notification/>
      </div>
    </NotificationContextProvider>
  )
}

export default App

