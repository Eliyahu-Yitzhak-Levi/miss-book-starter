export function StarsRating({ handleChange, rating }) {

    function onSetRating(rate) {
        if (!isEditable) return
        const target = { name: 'rating', value: rate }; // why does the name matter here?? it used to be rating, I changed it to starsRating
        handleChange({ target });
    }

    const isEditable = typeof handleChange === 'function'
    const editClass = isEditable ? 'edit' : ''

    return (
        <div className={`star-rating ${editClass}`} >
            {[...Array(5)].map((_, idx) => (
                <span
                    key={idx}
                    className={`star ${idx < rating ? 'on' : 'off'}`}
                    onClick={() => onSetRating(idx + 1)}
                >
                    &#9733;
                </span>
            ))}
        </div>
    )
}