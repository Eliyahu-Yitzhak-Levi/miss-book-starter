const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
import { bookService } from "../services/book.service.js"


export function AddReview() {
    const [book, setBook] = useState(bookService.getEmptyBook())
    const params = useParams()
    const navigate = useNavigate()
    console.log(book);
    console.log(params);

    function onSave(ev) {
        ev.preventDefault()
        console.log(book);
        bookService.save(book)
            .then(() => navigate('/book'))
    }


    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'number':
                value = +value
                break

            case 'text':
                value = value
        }
        setBook(prevData => ({ ...prevData, [prop]: value }))
    }


    return <form onSubmit={onSave}>
        <div>
            <label htmlFor="bookAuthor">Author:</label>
            <input
                type="text"
                id="bookAuthor"
                name="authors"
                value={book.authors}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="bookTitle">Title:</label>
            <input
                type="text"
                id="bookTitle"
                name="title"
                value={book.title}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="fullName">Full Name:</label>
            <input
                type="text"
                id="fullName"
                name="fullName"
                value={book.fullName}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="rating">Rating:</label>
            <input
                type="number"
                id="rating"
                name="rating"
                value={book.rating}
                onChange={handleChange}
                min="1"
                max="5"
                required
            />
        </div>
        <div>
            <label htmlFor="readAt">Read At:</label>
            <input
                type="date"
                id="readAt"
                name="readAt"
                value={book.readAt}
                onChange={handleChange}
                required
            />
        </div>
        <button type="submit">Submit</button>
    </form>
}