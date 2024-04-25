import { useDispatch, useSelector } from 'react-redux'
import { getUserList } from '../reducers/usersReducer'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



function UsersList (){
  const userList = useSelector(state => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUserList())
  }, [dispatch])

  const handleBlogsUser = (id) => {
    navigate(`/users/${id}`)
  }

  return(
    <div className="mt-5 containerTable">
      <h1 className="text-center">Users</h1>
      <table className="table mt-5" id="tableUsers">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col" className='text-center'>Blogs created</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {userList.map(user => {
            return <tr key={user.id}>
              <th className="authorBlog" scope="row" onClick={() => handleBlogsUser(user.id)}>{user.name}</th>
              <td className="text-center">{user.blogs.length}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList