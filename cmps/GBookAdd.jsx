import { bookService } from "../services/book.service.js"
import { useDebounce } from "../customHooks/useDebounce.js"
import { utilService } from './util.service.js'
const { useState, useEffect, useRef } = React




export function GBookAdd() {

    const [searchBy, setSearchBy] = useState(bookService.getDefaultFilterGoogle())

    const [results, setResults] = useState([])

    const debounceSearchBy = useDebounce(searchBy)
    useEffect(() => {
        handleSearch()
    }, [debounceSearchBy])

    console.log(searchBy)

    function handleTextChange(target) {
        console.log('handeling TEXT change');
        console.log(target)
        const { name, value } = target
        setSearchBy(prevSearchBy => ({ ...prevSearchBy, [name]: value }))
    }

    function handleSearch() {
        console.log('handeling SEARCH change', searchBy);
        // console.log(`https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20${searchBy.search}`);

        const googleSearch = axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20${searchBy.search}`)
        googleSearch.then((data) => console.log(data))
    }

    function handleChanges({ target }) {
        handleTextChange(target)
    }

    return (
        <div>
            <input onChange={handleChanges} value={searchBy.search} placeholder='Search' type='text' name='search' />
            <button onClick={handleChanges}>Search</button>
        </div>
    )
}
