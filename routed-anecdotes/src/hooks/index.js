import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')
    const onChange = (e) => {
        setValue(e.target.value)
    }

    const resetValue = () => {
        setValue('')
    }

    const atributes = {
        type,
        value,
        onChange
    }

    return {
        atributes,
        resetValue
    }
}