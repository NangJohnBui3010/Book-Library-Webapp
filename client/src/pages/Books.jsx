import { useState, useEffect } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import GoToButton from '../components/GoToButton';

export default function Books(){
    const [books,setBooks] = useState([])
    const handleDelete = async (id) =>{
        try{
            await axios.delete("http://localhost:8800/books/"+id);
            console.log("book deleted")
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        const fetchAllBooks = async() =>{
            try{
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks();
    },[])

    return(
        <div>
            <h1>Nang Bui Book Library</h1>
            <div className = "books">
                {books.map(book=>(
                    <div className = "book">
                        {book.cover && <img src={book.cover} alt=""></img>}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}</span>
                        <button className = "delete-button" onClick = {()=>handleDelete(book.id)}>Delete</button>
                        <GoToButton className = "goto-button" link={`./update/${book.id}`}>Update</GoToButton>
                    </div>
                ))}
            </div>
            <GoToButton className = "goto-button add-button" link={"./add"}>Add New Book</GoToButton>
        </div>
    )
}