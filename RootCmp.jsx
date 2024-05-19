const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { BookIndex } from "./pages/BookIndex.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { AddReview } from "./cmps/AddReview.jsx"
import { EditBook } from "./cmps/EditBook.jsx"
import { GBookAdd } from "./cmps/GBookAdd.jsx"



export function RootCmp() {
    return (
        <Router>
            <AppHeader />
            <main className="content-grid">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/book" element={<BookIndex />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/book/:bookId" element={<BookDetails />}></Route>
                    <Route path="/book/review/:bookId" element={<AddReview />}></Route>
                    <Route path="/book/edit" element={<EditBook />}></Route>
                    <Route path="/book/edit/:bookId" element={<EditBook />}></Route>
                    <Route path="/book/addGoogle" element={<GBookAdd />}></Route>
                </Routes>
            </main>
        </Router >
    )
}