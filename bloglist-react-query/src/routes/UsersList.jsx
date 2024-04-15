import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../userRequests"

export function UsersList (){
    const [ userList, setUserList] = useState([])

    const result = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })

    if(result.isLoading){
        return <div>Loading data...</div>
      }
    
      const usersQuery = result.data


    return(
    <div>
        <h1>Users</h1>
        <table className="table" id="tableUsers">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Blogs created</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              
                {usersQuery.map(user => {
                    return <tr key={user.id}>
                            <th scope="row">{user.name}</th>
                            <td colSpan="col-3">{user.blogs.length}</td>
                          </tr>
                })}
               
            </tbody>
        </table>
    </div>
    )
}