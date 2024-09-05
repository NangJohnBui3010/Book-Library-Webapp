export default function BookCard({book}){
    return(
        <div className = "book-card">
            <h2>{book.title}</h2>
            <h3>AUthor: {book.author}</h3>
        </div>
    )
}