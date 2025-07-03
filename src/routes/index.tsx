import App from "@/App";
import HomePage from "@/pages/home/home";
import { createBrowserRouter } from "react-router";

const route = createBrowserRouter([
    {
        path: '/',
        element: <App />,

        children: [
            {
                // path: '/',
                index: true,
                element: <HomePage />
            }
        ]
    }
])

export default route;