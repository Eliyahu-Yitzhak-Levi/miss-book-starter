
const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { BookPreview } from "./BookPreview.jsx"




export function BookList({ books }) {
    return (
        <ul className="book-list">
            {books.map((book, index) => (
                <li key={index} className="book-item">
                    <BookPreview book={book}></BookPreview>
                    <Link to={`/book/${book.id}`}><button >Show Details</button></Link>
                    <Link to={`/book/edit/${book.id}`}><button>Edit book</button></Link>
                    
                </li>
            ))}
        </ul>
    )
}

