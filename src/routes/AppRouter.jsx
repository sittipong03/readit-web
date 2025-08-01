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
import PaymentSuccess from "../pages/PaymentSuccess";

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
      { path: "/home", element: <HomePage /> },
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
      { path: '/home', element: <HomePage /> },
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
      const user = 1
      // const user = useUserStore(state => state.user) // กำหนดว่าใครเข้ามา จะเอามาจาก back แล้วใช้ useUserStore เช็ค กำหนดค่าเอา
      const finalRouter = user == 1 ? routerUser : routerGuest //  เลือก เส้นทางตามตัวแปร user ที่เข้ามา 

  return (
    <Suspense fallback={<p>Loading</p>}>
      <RouterProvider router={finalRouter} />
    </Suspense>
  );
}
export default AppRouter;
