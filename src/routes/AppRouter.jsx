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
import SettingPage from "../pages/user/SettingPage";
import ShelfPage from "../pages/user/ShelfPage";
import CartPage from "../pages/user/CartPage";
import CheckOutPage from "../pages/user/CheckOutPage";
import PaymentSuccess from "../pages/PaymentSuccess";
import BookCard from "../components/BookCard";

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
      { path: "/bookcard", element: <BookCard /> }, // Example route for BookCard component
      { path: "/shelf", element: <ShelfPage /> }, // Example route for ShelfPage component
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
      { path: "/home", element: <HomePage /> },
      { path: "/book/:bookId", element: <BookPage /> },
      { path: "/userproflie", element: <UserProfilePage /> },
      { path: "/setting", element: <SettingPage /> },
      { path: "/shelf", element: <ShelfPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckOutPage /> },
      { path: "/payment", element: <PaymentSuccess /> },
    ],
  },
]);

function AppRouter() {
  const role = useUserStore((state) => state.role); // กำหนดว่าใครเข้ามา จะเอามาจาก back แล้วใช้ useUserStore เช็ค กำหนดค่าเอา
  const finalRouter =
    role === "USER" ? routerUser : role === "ADMIN" ? routerUser : routerGuest; //  เลือก เส้นทางตามตัวแปร user ที่เข้ามา

  return (
    <Suspense fallback={<p>Loading</p>}>
      <RouterProvider router={finalRouter} />
    </Suspense>
  );
}
export default AppRouter;
