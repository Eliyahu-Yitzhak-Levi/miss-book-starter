import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getPriceStats,
    getCategoryStats
}
// For Debug (easy access from console):
// window.bs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.minPrice) {
                books = books.filter(book => book.price >= filterBy.minPrice)
            }

            return books
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
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = '') {
    return { title, price }
}

function getDefaultFilter(filterBy = { txt: '', minPrice: 0 }) {
    return { txt: filterBy.txt, minPrice: filterBy.minPrice }
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

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        const categories = ['fiction', 'non-fiction', 'biography', 'history']
        for (let i = 0; i < 6; i++) {
            const category = categories[utilService.getRandomIntInclusive(0, categories.length - 1)]
            books.push(_createBook(category, utilService.getRandomIntInclusive(10, 100)))
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, price = 50) {
    const book = getEmptyBook(title, price)
    book.id = utilService.makeId()
    return book
}

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
