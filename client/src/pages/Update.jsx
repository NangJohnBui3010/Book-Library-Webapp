import React from "react";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function Update(){
    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];
    console.log(bookId);
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
            await axios.put("http://localhost:8800/books/"+bookId,book)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }
    console.log(book)
    return(
        <div className = "update-form">
            <h1>Update book</h1>
            <input type="text" onChange = {handleChange} placeholder="title" name="title"/>
            <input type="text" onChange = {handleChange} placeholder="desc" name="desc"/>
            <input type="text" onChange = {handleChange} placeholder="cover" name="cover"/>
            <input type="text" onChange = {handleChange} placeholder="price" name="price"/>
            <button className = "update-button" onClick = {handleClick}>Update</button>
        </div>
    )
}