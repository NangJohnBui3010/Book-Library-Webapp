import React from "react";
import { useNavigate } from "react-router-dom";

export default function GoToButton({link, children, ...rest}){
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate(link)
    }
    return(
        <button onClick = {handleClick} {...rest}>
            {children}
        </button>
    )
}