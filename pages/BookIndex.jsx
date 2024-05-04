const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"



export function BookIndex() {

    const [books, setBooks] = useState([])

    useEffect(() => {
        bookService.query()
            .then(books => {
                console.log(books);
                setBooks(books)
            })
    }, [])

    return (
        <section className='book-index'>
            <h1>Books</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={index}>
                            <td>{book.title}</td>
                            <td>{book.listPrice.amount} {book.listPrice.currencyCode}</td>
                            <td>{book.authors.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}