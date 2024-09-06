import React from "react";
import { useState } from "react";
export default function BookStore(){
    const [searchQuery, setSearchQuery] = useState("");
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(false);
    function keyHandle(event){
        if(event.key ==="Enter"){
            setLoading(true);
            try{
                const fetchData = async() => {
                    const query = searchQuery;
                    console.log(searchQuery);
                    const response = await fetch(`https://openlibrary.org/search.json?q=${query.split(" ").join("+")}`);
                    setBookData(await response.json());
                    setLoading(false);
                }
                fetchData();
            }catch(err){
                console.log(err);
            }
        }
    }
    return(
        <div className = "book-store-page">
            <div className = "navigation-bar">
                <h1>Book browse</h1>
                <input className = "search-bar" 
                    type = "text" 
                    placeholder = "Search for titles, author, etc."
                    onKeyDown={keyHandle}
                    value = {searchQuery}
                    onChange = {(e)=>setSearchQuery(e.target.value)}
                ></input>
                <button className = "category-browse-button">Browse by category</button>
                <button className = "your-library-button">Your library</button>
            </div>

            {loading && <h1>Loading results</h1>}

            {!loading && bookData && 
            <div className = "book-shelf">
                {
                    bookData.docs.map(book => (
                        <div className = "book-from-bookstore">
                            <img className = "book-thumbnail" src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`} alt=""></img>
                            <h2>{book.title}</h2>
                            <h3>Author: {book.author_name}</h3>
                        </div>
                    ))
                }
            </div>
            }

        </div>
    )
}