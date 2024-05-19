import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'booksDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getDefaultFilterGoogle,
    getPriceStats,
    getCategoryStats,
    getBook,
    addReview,
    getEmptyReview
}
// For Debug (easy access from console):
window.bs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            return books
        })
}

function getBook(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            // console.log(book);
            return book
        })
}


function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(book)
            return book
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        // console.log('putting book', book);
        return storageService.put(BOOK_KEY, book)
    } else {
        // console.log('posting book', book);
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook() {
    const categories = ['Fiction', 'Nonfiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller', 'Romance', 'Horror'];

    const emptyBook = {
        id: null,
        title: utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4),
        authors: [utilService.makeLorem(1)],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [categories[utilService.getRandomIntInclusive(0, categories.length - 1)]],
        thumbnail: `http://coding-academy.org/books-photos/${Math.floor(Math.random() * 10) + 1}.jpg`,
        language: "en",
        reviews: [],
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }

    return emptyBook
}

function getDefaultFilter(filterBy = { title: '', minPrice: 0 }) {
    return { title: filterBy.title, minPrice: filterBy.minPrice }
}

function getDefaultFilterGoogle(filterBy = { search: '' }) {
    return { search: filterBy.search }
}


function getPriceStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByPriceMap = _getBookCountByPriceMap(books)
            const data = Object.keys(bookCountByPriceMap).map(priceRange => ({ title: priceRange, value: bookCountByPriceMap[priceRange] }))
            return data
        })

}

function getCategoryStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByCategoryMap = _getBookCountByCategoryMap(books)
            const data = Object.keys(bookCountByCategoryMap)
                .map(category =>
                ({
                    title: category,
                    value: Math.round((bookCountByCategoryMap[category] / books.length) * 100)
                }))
            return data
        })
}


function addReview(book) {
    console.log('the review is being added to book : ', book);
    return storageService.put(BOOK_KEY, book)
        .then((book) => {
            console.log('adding review...');
            console.log(book)
        })
}



function getEmptyReview() {
    return {
        id: utilService.makeId(),
        name: utilService.makeLorem(5),
        reviewPublishDate: utilService.getRandomIntInclusive(1950, 2024),
        review: utilService.makeLorem(25),
        rating: utilService.getRandomIntInclusive(1, 5)
    }
}


function _createBooks() {

    const categories = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []


    for (let i = 0; i < 3; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [utilService.makeLorem(1)],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [categories[utilService.getRandomIntInclusive(0, categories.length - 1)]],
            thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
            language: "en",
            reviews: [getEmptyReview(), getEmptyReview(), getEmptyReview()],
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            }
        }
        books.push(book)
        utilService.saveToStorage(BOOK_KEY, books)
    }
}


// function _createBook(title, price = 50) {
//     const book = getEmptyBook(title, price)
//     book.id = utilService.makeId()
//     return book
// }

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function _getBookCountByPriceMap(books) {
    const bookCountByPriceMap = books.reduce((map, book) => {
        if (book.price < 30) map.cheap++
        else if (book.price < 70) map.moderate++
        else map.expensive++
        return map
    }, { cheap: 0, moderate: 0, expensive: 0 })
    return bookCountByPriceMap
}

function _getBookCountByCategoryMap(books) {
    const bookCountByCategoryMap = books.reduce((map, book) => {
        if (!map[book.category]) map[book.category] = 0
        map[book.category]++
        return map
    }, {})
    return bookCountByCategoryMap
}
