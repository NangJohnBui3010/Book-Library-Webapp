import React from "react";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
export default function Add(){

    const navigate = useNavigate()
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    })

    const handleChange = (e) =>{
        setBook((prev)=>({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleClick = async (e) =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/books",book)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }
    console.log(book)
    return(
        <div className = "new-book-form">
            <h1>Add new book</h1>
            <input type="text" onChange = {handleChange} placeholder="title" name="title"/>
            <input type="text" onChange = {handleChange} placeholder="desc" name="desc"/>
            <input type="text" onChange = {handleChange} placeholder="cover" name="cover"/>
            <input type="text" onChange = {handleChange} placeholder="price" name="price"/>
            <button className = "add-button" onClick = {handleClick}>Add</button>
        </div>
    )
}