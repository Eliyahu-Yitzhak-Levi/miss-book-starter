const { useState, useEffect } = React





export function BookPreview({ book }) {
    // console.log(book);
    return (
        <article className='book-preview'>
            <span>{book.title}</span>
            <span className='amount'>{book.listPrice.amount} {book.listPrice.currencyCode}</span>
            <span>{book.authors}</span>
        </article>
    )
}