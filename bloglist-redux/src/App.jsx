import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { HeaderUserInfo } from './components/HeaderUserInfo'
import { AddBlogForm } from './components/AddBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, sortByLikesR } from './reducers/blogReducer'
import { getLoggedUser } from './reducers/userReducer'
import { initialOrder } from './reducers/originalOrderblogsReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import UsersList from './routes/UsersList'
import BlogsUser from './routes/BlogsUser'
import BlogView from './routes/BlogView'




function App() {
  const [originalOrder, setOriginalOrder] = useState(true)
  const dispatch = useDispatch()
  const userLog = useSelector(state => state.userLogin)
  const blogList = useSelector(state => state.blogs)
  const originalOrderBlogs = useSelector(state => state.originalOrder)

  const match = useMatch('/users/:id')

  const blogMatch = useMatch('/blogs/:id')

  const uBlogs = match ? blogList.filter(b => b.user?.id === match.params.id)
    : null

  const blogView = blogMatch ? blogList.find(b => b.id === blogMatch.params.id)
    : null

  console.log(blogList)


  dispatch(getLoggedUser())

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initialOrder())
  }, [dispatch])




  const sortByLikes = () => {
    setOriginalOrder(!originalOrder)
    const arrSort = [...blogList]
    arrSort.sort((a,b) => {
      return b.likes - a.likes
    })
    dispatch(sortByLikesR(arrSort))
    if(blogList[0].title === arrSort[0].title){
      dispatch(sortByLikesR(originalOrderBlogs))
    }
  }



  return (
    <div className='container containerBlogs'>
      <h1 className='text-center mt-3 mb-5'>Blogs 🗒️</h1>
      <Notification/>
      {userLog === null ? <LoginForm/> : <HeaderUserInfo/> }
      <Routes>
        <Route path='/blogs/:id' element={userLog !== null
          ? <BlogView blogView={blogView}/>
          : ''
        }/>
        <Route path='/users/:id' element={<BlogsUser uBlogs={uBlogs} />}/>
        <Route path='/users' element={<UsersList/>}/>
        <Route path='/' element={(userLog && <AddBlogForm/>) ?
          <>
            <AddBlogForm/>

            <button onClick={sortByLikes} className="btn btn-outline-success mb-2">{originalOrder? 'Sort by likes' : 'Default order'}</button>

            <ul className='list-group' id='initialList'>
              {blogList.map(blog => {
                return <Blog key={blog.id} blog={blog} />
              })}
            </ul>
          </>
          : ''
        }/>
      </Routes>
      <Notification className='mt-5'/>
    </div>
  )
}

export default App
