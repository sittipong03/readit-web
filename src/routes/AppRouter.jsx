import { createBrowserRouter ,RouterProvider, Navigate } from "react-router"
import { lazy, Suspense } from "react"
import UserSideBar from "../layout/UserSideBar"
import PaymentSuccess from "../pages/PaymentSuccess"
import Home from "../pages/Home"
import GuestSideBar from "../layout/GuestSideBar"
import UserProfile from "../pages/UserProfile"

const guestRouter = createBrowserRouter([
  {
    path: "/", element: <GuestSideBar/>,
    children: [
      {path: "/", element: <Home/>}
    ]
  }
]);

const userRouter = createBrowserRouter([
  {
    path: "/", element: <UserSideBar/>,
    children: [
      {path: "/", element: <UserProfile/>},
      {path: "/payment", element: <PaymentSuccess/>}
    ]
  }
]);


function AppRouter() {
  return (
    // <RouterProvider router={guestRouter}/>
    <RouterProvider router={userRouter}/>
  )
}
export default AppRouter