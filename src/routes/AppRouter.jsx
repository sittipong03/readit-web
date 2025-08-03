import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { Children, lazy, Suspense } from "react";

//store section
import useUserStore from "../stores/userStore";

//layout section
import GuestLayout from "../layouts/GuestLayout";
import UserLayout from "../layouts/UserLayout";

//page section
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import BookPage from "../pages/BookPage";
import ReviewPage from "../pages/ReviewPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import RegisterBookTag from "../pages/user/RegisterBookTag";
import SettingPage from "../pages/user/SettingPage";
import ShelfPage from "../pages/user/ShelfPage";
import CartPage from "../pages/user/CartPage";
import CheckOutPage from "../pages/user/CheckOutPage";
import PaymentSuccess from "../pages/user/PaymentSuccessPage";
import ButtonTest from "../pages/test/ButtonTest";
import Home from "../pages/Home";

const routerGuest = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },

  {
    element: <GuestLayout />,
    children: [
      { path: "/homepage", element: <HomePage /> },
      { path: "/book/:bookId", element: <BookPage /> },
      { path: "/review", element: <ReviewPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/Register", element: <RegisterPage /> },
      { path: "/ButtonTest", element: <ButtonTest /> },
    ],
  },
]);

const routerUser = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/home" />,
  },

  {
    element: <UserLayout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/homepage', element: <HomePage /> },
      { path: '/book/:bookId', element: <BookPage /> },
      { path: '/userproflie', element: <UserProfilePage /> },
      { path: '/setting', element: <SettingPage /> },
      { path: '/shelf', element: <ShelfPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckOutPage /> },
      {path: '/payment', element: <PaymentSuccess/>}
    ],
  },
]);

function AppRouter() {
      const role = useUserStore(state => state.role) // กำหนดว่าใครเข้ามา จะเอามาจาก back แล้วใช้ useUserStore เช็ค กำหนดค่าเอา
      // test pull push 
      console.log(role)
      const finalRouter = role === "USER" || role === "ADMIN" ? routerUser : routerGuest //  เลือก เส้นทางตามตัวแปร user ที่เข้ามา 

  return (
    <Suspense fallback={<p>Loading</p>}>
      <RouterProvider router={finalRouter} />
      {/* <RouterProvider router={routerUser} /> */}
    </Suspense>
  );
}
export default AppRouter;
