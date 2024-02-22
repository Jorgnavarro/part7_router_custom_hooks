import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState([])

    const onChange = (e) => {
        setValue(e.target.value)
    } 

    const elementAtributes = {
        value,
        type,
        onChange
    }


    return [
        elementAtributes,
        setValue
    ]
}