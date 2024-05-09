const { useState, useEffect } = React




export function BookFilter({ filterBy, onFilter }) {

    const [filterByToEdit, setFilterBy] = useState(filterBy)


    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, value } = target;
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, [name]: value }));
    }



    return <section className="book-filter">
        <div className="filters">
            <input onChange={handleChange} value={filterByToEdit.title} placeholder='Search' type='text' name='title' />
            <input onChange={handleChange} value={filterByToEdit.minPrice} placeholder='Price' type='number' name='minPrice' />
        </div>
    </section>
}