const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM
import { AddReview } from "../cmps/AddReview.jsx"
import { StarsRating } from "../cmps/dynamic-inputs/StarsRating.jsx"
import { bookService } from "../services/book.service.js"

export function BookDetails() {

    const [isLoading, setIsLoading] = useState(true)
    const [book, setBook] = useState(null)
    const [addingReview, setAddingReview] = useState(false)
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(book => {
                // console.log(book);
                setBook(book)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log('cant find book', error);
                navigate('/book')
            })
    }, [params.bookId])


    if (isLoading) return <h1>Loading</h1>

    return (
        <dialog className="book-details" open>
            <h2>{book.title}</h2>
            <ul className="book-list">
                <li>{book.id}</li>
                <li>Author: {book.authors}</li>

            </ul>
            <div className="reviews-container">
                {book.reviews.map(review => (
                    <div key={review.id} className="review-item">
                        <section className="review-name">{review.name}</section>
                        <section className="review-date">{review.reviewPublishDate}</section>
                        <section className="review-content">{review.review}</section>
                        {/* <section className="review-rating">Rating: {review.rating}</section> */}
                        <section className="review-rating"><StarsRating rating={review.rating} /></section>

                    </div>
                ))}
            </div>
            <button onClick={() => setAddingReview(true)}>Add a review</button>

            {addingReview && <AddReview book={book}  ></AddReview>}

            <Link to={`/book/${book.prevBookId}`}><button>Prev</button></Link>
            <Link to='/book'><button >Close</button></Link>
            <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>
        </dialog>
    )
}
