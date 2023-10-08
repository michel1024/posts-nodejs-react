import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Post from "./Components/Post/Post";
import App from "./Components/APP/App";
import Login from "./Components/Login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/posts",
        element: <Post />
    },
    {
        path: "/login",
        element: <Login />
    }
])

function Router(){
    return (
        <RouterProvider router={router} />
    );
}

export default Router;