
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"



export function BookIndex() {

    const [books, setBooks] = useState([])

    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())



    useEffect(() => {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
            })
    }, [filterBy])



    function setNewFilterBy(newFilter) {
        setFilterBy(newFilter)
    }



    return (
        <section className='book-index'>
            <h1>Books</h1>
            <Link to="/book/edit"><button>Add a book</button></Link>
            <Link to="/book/addGoogle"><button>Add a book from google</button></Link>
            <BookFilter filterBy={filterBy} onFilter={setNewFilterBy}></BookFilter>
            <div className="table-headers">
                <span>Title</span>
                <span>Price</span>
                <span>Author</span>
            </div>

            <BookList books={books} ></BookList>
        </section >
    )
} 