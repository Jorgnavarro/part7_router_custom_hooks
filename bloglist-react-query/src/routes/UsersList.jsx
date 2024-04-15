import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../userRequests"
import { useNavigate } from 'react-router-dom'

export function UsersList (){

    const navigate = useNavigate();

    const result = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })

    if(result.isLoading){
        return <div>Loading data...</div>
      }
    
    const usersQuery = result.data

    const handleBlogsUser = (id) => {
      console.log(id)
      navigate(`/users/${id}`)
    }


    return(
    <div className="mt-5">
        <h1 className="text-center">Users</h1>
        <table className="table mt-5" id="tableUsers">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Blogs created</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              
                {usersQuery.map(user => {
                    return <tr key={user.id}>
                            <th className="authorBlog"scope="row" onClick={() => handleBlogsUser(user.id)}>{user.name}</th>
                            <td className="text-center" colSpan="col-3">{user.blogs.length}</td>
                          </tr>
                })}
            </tbody>
        </table>
    </div>
    )
}