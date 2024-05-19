const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { SelectRating } from "./dynamic-inputs/SelectRating.jsx";
import { StarsRating } from "./dynamic-inputs/StarsRating.jsx";

export function AddReview({ book }) {
    const [bookReviewd, setBookReviewd] = useState(book);
    const [review, setReview] = useState({
        rating: 0
    })
    const [radioType, setRadioType] = useState(null)
    const navigate = useNavigate()

    const { rating } = review


    function onSave(ev) {
        ev.preventDefault()



        const newId = utilService.makeId()

        const newReview = { ...review, id: newId }

        bookReviewd.reviews.push(newReview)

        console.log('saving a book called : ', book);
        bookService.addReview(bookReviewd)
            .then(() => navigate('/book'))
    }

    function handleChange({ target }) {
        console.log(target)
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'number':
                value = +value
                break

            case 'text':
                value = value
                break
        }
        setReview(prevData => ({ ...prevData, [prop]: value }))
    }


    function handleRadioChange(selectedValue) {
        setRadioType(selectedValue)
        console.log(selectedValue);
    }


    return <form onSubmit={onSave}>
        <div>
            <label htmlFor="bookAuthor">Author:</label>
            <input
                type="text"
                id="bookAuthor"
                name="authors"
                value={bookReviewd.authors}
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
                value={bookReviewd.title}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="name">Reveiwers name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={bookReviewd.reviews.name}
                onChange={handleChange}
                required
            />
        </div>
        <div className="select-rating-type">
            <span>Select your rating :</span>
            <div className="radio-group">
                <input
                    type="radio"
                    id="rating-select"
                    name="rating"
                    value="select"
                    onChange={(ev) => { handleRadioChange(ev.target.value) }}
                    required
                />
                <label htmlFor="rating-select">Rate by number :</label>
            </div>
            <div className="radio-group">
                <input
                    type="radio"
                    id="rating-stars"
                    name="rating"
                    value="stars"
                    onChange={(ev) => { handleRadioChange(ev.target.value) }}
                    required
                />
                <label htmlFor="rating-stars">Rate by stars :</label>
            </div>
            {radioType && <DynamicCmp type={radioType} rating={rating} handleChange={handleChange} />}
        </div>

        <div>
            <label htmlFor="reviewPublishDate">Read At:</label>
            <input
                type="date"
                id="readAt"
                name="reviewPublishDate"
                value={bookReviewd.reviews.reviewPublishDate}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="review">Review (up to 40 words):</label>
            <textarea
                id="review"
                name="review"
                value={bookReviewd.reviews.review}
                onChange={handleChange}
                maxLength={160} // 40 words with an average of 4 characters per word
                style={{ width: '100%', minHeight: '80px', padding: '5px' }} // Simple styling
                required
            />
        </div>
        <button type="submit">Submit</button>
    </form>
}


function DynamicCmp(props) {
    switch (props.type) {
        case 'select':
            return <SelectRating {...props} />
        case 'stars':
            return <StarsRating {...props} />
    }
}