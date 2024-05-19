export function SelectRating({ type, rating, handleChange }) {
    console.log('type is', type);
    console.log('rating is', rating);

    function onSetSelect(selectedValue) {
        const target = { name: 'rating', value: +selectedValue }
        handleChange({ target })
    }

    return (
        <select value={rating} onChange={(ev) => { onSetSelect(ev.target.value) }}>
            <option >1</option>
            <option >2</option>
            <option >3</option>
            <option> 4</option>
            <option >5</option>
        </select>
    )
}