import App from "@/App";
import BooksPage from "@/pages/books/Books";
import BorrowSummary from "@/pages/borrow-summary/BorrowSummary";
import Borrow from "@/pages/borrow/Borrow";
import CreateBook from "@/pages/create-book/CreateBook";
import Dashboard from "@/pages/dashboard/Dashboard";
import EditBook from "@/pages/edit-book/EditBook";
import SingleBook from "@/pages/single-book/SingleBook";
import { createBrowserRouter } from "react-router";

const route = createBrowserRouter([
    {
        path: '/',
        element: <App />,

        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'books',
                element: <BooksPage />
            },
            {
                path: 'create-book',
                element: <CreateBook />
            },
            {
                path: 'edit-book/:id',
                element: <EditBook />
            },
            {
                path: 'books/:id',
                element: <SingleBook />
            },
            {
                path: 'borrow/:bookId',
                element: <Borrow />
            },
            {
                path: 'borrow-summary',
                element: <BorrowSummary />
            },
        ]
    }
])

export default route;