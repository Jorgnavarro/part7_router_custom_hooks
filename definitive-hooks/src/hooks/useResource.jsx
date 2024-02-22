import { useState, useEffect } from "react"
import axios from 'axios'

export const useResource = (url) => {
    const [data, setData] = useState([])
   
    
    useEffect(() => {
        if(data){
            axios.get(url).then(response => {
                setData(response.data)
            })
        }else{
            console.log('Data not found')
        }
        
    }, [url, data])

    const create =  async (object) => {
        const response = await axios.post(url, object)
        data.concat(response.data)
    }


    return[
        data,
        create
    ]
    
}