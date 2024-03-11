import { useEffect, useContext, useState } from 'react'
import { ContextGlobal } from './context/globalContext'
import blogService from './services/blog'
import userService from './services/user'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { HeaderUserInfo } from './components/HeaderUserInfo'
import { AddBlogForm } from './components/AddBlogForm'


function App() {

  const [userDDBB, setUserDDBB] = useState({})

  const { blogs, setBlogs, errorMessage, infoMessage, setUser, user, modifierLikes } = useContext(ContextGlobal)

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogList => {
        setBlogs(initialBlogList)
      })
  }, [setBlogs, modifierLikes])

  console.log(blogs)



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

  const updateLikesBlog = async (id, newObject) => {
    try{
      const response = await blogService.update(id, newObject)

      setBlogs(
        blogs.map( blog => {
          return blog.id !== response.id ? blog : response
        })
      )
    }catch(error){
      console.log('You need to provide a jwt or login again')
    }
  }

  const deleteABlog = async (id) => {

    try{
      const response = await blogService.deleteBlog(id)
      console.log(response)
      setBlogs(
        blogs.filter(blog => {
          return blog.id !== id
        })
      )
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className='container containerBlogs'>
      <h1 className='text-center mt-3 mb-5'>Blogs 🗒️</h1>
      <Notification className="alert-danger" message={errorMessage}/>
      {user === null ? <LoginForm/> : <HeaderUserInfo/> }
      <Notification className="alert-success" message={infoMessage}/>
      {user && <AddBlogForm/>}
      {user && <button onClick={sortByLikes} className="btn btn-outline-success mb-2">Sort by likes</button>}
      {user && <ul className='list-group' id='initialList'>
        {blogs.map(blog => {
          return <Blog key={blog.id} blog={blog} userDDBB={userDDBB} updatedBlog={updateLikesBlog} deleteABlog={deleteABlog}/>
        })}
      </ul>}
    </div>
  )
}

export default App
