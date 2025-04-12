import { useEffect, useState } from "react";

export default function useDebounce(intialValue , delay=500){
    const [value, setValue] = useState(intialValue);
    const [debouncedValue, setDebouncedValue] = useState(intialValue);
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedValue(value);
        },delay)
        return ()=>{clearTimeout(timer)}
    },[value])

    return [ value ,setValue ,debouncedValue];



}