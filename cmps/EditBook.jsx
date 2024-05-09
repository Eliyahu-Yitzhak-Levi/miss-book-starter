const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
import { bookService } from "../services/book.service.js"


export function EditBook() {
    const params = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        if (!params.bookId) {
            console.log('adding');
            // If params.bookId is not present, initialize with empty book
            const emptyBook = bookService.getEmptyBook();
            setBook(emptyBook);
        } else {
            // If params has bookId, fetch the book details
            bookService.getBook(params.bookId)
                .then(res => {
                    console.log(res);
                    setBook(res);
                })
                .catch(error => {
                    console.error('Error fetching book:', error);
                    // If book is not found, navigate to book list
                    navigate('/book');
                });
        }
    }, [params]);

    console.log(book);

    function onSave(ev) {
        ev.preventDefault();
        console.log(book);
        bookService.save(book)
            .then(() => navigate('/book'));
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

    if (!book) return <h1>Loading</h1>
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

        <button type="submit">Submit</button>
    </form>
}