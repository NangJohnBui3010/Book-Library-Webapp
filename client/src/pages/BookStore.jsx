import React, { useState } from "react";
export default function BookStore(){
    const [searchQuery, setSearchQuery] = useState("");
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState({});
    const [welcome, setWelcome] = useState(true);
    async function fetchData() {
        setWelcome(false); 
        setLoading(true);
        try {
            const query = searchQuery;
            console.log(searchQuery);
            const response = await fetch(`https://openlibrary.org/search.json?q=${query.split(" ").join("+")}`);
            const data = await response.json();
            setBookData(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    function keyHandle(event){
        if(event.key ==="Enter"){
            fetchData();
        }
    }

    const toggleFavorite = (bookId) => {
        setFavorites(prev => ({
            ...prev,
            [bookId]: !prev[bookId]
        }));
    };

    const refreshPage = () => {
        window.location.reload();
    };

    return(
        <div className = "book-store-page">
            <div className = "navigation-bar">
                <h1 onClick={refreshPage} style={{ cursor: 'pointer' }}>Book Store</h1>
                <input className = "search-bar" 
                    type = "text" 
                    placeholder = "Search for titles, author, etc."
                    onKeyDown={keyHandle}
                    value = {searchQuery}
                    onChange = {(e)=>setSearchQuery(e.target.value)}
                ></input>
                <button className = "favorites-button">Favorited</button>
                <button className = "your-library-button">Your library</button>
            </div>
            {welcome ? (
                <div className="welcome-section">
                    <h2>Welcome to the Book Store!</h2>
                    <p>Search for your favorite books, add them to your library, and mark them as favorites.</p>
                    <p>Get started by entering a search term above.</p>
                </div>
            ) : (
                <>
                    {loading && (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading results...</p>
                        </div>
                    )}

                    {!loading && bookData && 
                    <div className = "book-shelf">
                        {
                            bookData.docs.map(book => (
                                <div key={book.id} className = "book-from-bookstore">
                                    <img className = "book-thumbnail" src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`} alt=""></img>
                                    <div className = "book-info">
                                        <h2>{book.title}</h2>
                                        <h3>Author: {book.author_name}</h3>
                                        <h3>{Array.isArray(book.publisher) ? book.publisher.length : 0} publishers</h3>
                                        <h3>Publish Date: {book.first_publish_year}</h3>
                                    </div>
                                    <div className = "book-actions">
                                        <button 
                                            className={`favorite-button ${favorites[book.id] ? 'favorited' : ''}`}
                                            aria-label={favorites[book.id] ? "Remove from favorites" : "Add to favorites"}
                                            onClick={(event) => {
                                                toggleFavorite(book.id);
                                                const button = event.currentTarget;
                                                button.classList.add('animate');
                                                setTimeout(() => button.classList.remove('animate'), 700);
                                            }}
                                        >
                                            <svg className="heart-icon" viewBox="0 0 24 24" width="24" height="24">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>
                                        </button>
                                        <button className = "add-to-library-button">Add to library</button>
                            
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    }
                </>
            )}
        </div>
    )
}