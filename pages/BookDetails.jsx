const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM
import { bookService } from "../services/book.service.js"

export function BookDetails() {

    const [isLoading, setIsLoading] = useState(true)
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(book => {
                console.log(book);
                setBook(book)
                setIsLoading(false)
            })
            .catch(() => {
                alert('Couldnt get book')
                navigate('/book')
            })
    }, [params.bookId])



    if (isLoading) return <h1>Loading</h1>;

    return (
        <dialog className="book-details" open>
            <h2>{book.title}</h2>
            <ul className="book-list">
                <li>{book.id}</li>
                <li>Author: {book.authors.join(', ')}</li>
                <Link to='/book/review'><button>Add a review</button></Link>
                
            </ul>
            <Link to={`/book/${book.prevBookId}`}><button>Prev</button></Link>
            <Link to='/book'><button >Close</button></Link>
            <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>

        </dialog>
    )
}
