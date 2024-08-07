import {createBrowserRouter,RouterProvider} from"react-router-dom"
import App from "../App"
import AuthLayout from "../pages/(auth)"
import Login from "../pages/(auth)/login/page"
import Register from "../pages/(auth)/register/page"
import Produtos from "../pages/home"
import Dashboard from "../pages/dash/page"





export default function RootApp(){



    const route=createBrowserRouter([
        {
            path:'/',
            element:<App/>,
            children:[
                {
                    path:'/',
                    element:<Produtos/>

                },
                {
                    path:'/products',
                    element:<Produtos/>

                },
                {
                    path:"/dashboard",
                    element:<Dashboard/>
                }
            ]
        },
        {
            path:'/auth',
            element:<AuthLayout/>,
            children:[
                {
                    path:'login',
                    element:<Login/>

                },
                {
                    path:'register',
                    element:<Register/>

                },

            ]
        }

    ])



    return (
        <RouterProvider router={route}   />
    )

}