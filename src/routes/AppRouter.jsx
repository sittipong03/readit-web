import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { Children, lazy, Suspense } from "react";

//store section

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
import ButtonTest from "../pages/test/ButtonTest";

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

<<<<<<< Updated upstream
const routerUser = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
=======
])

const routerUser = createBrowserRouter ([
  // {
  //   path: '*',
  //   element: <Navigate to="/home" />,
  // },
>>>>>>> Stashed changes

  {
    element: <UserLayout />,
    children: [
<<<<<<< Updated upstream
      { path: "/home", element: <HomePage /> },
      { path: "/book/:bookId", element: <BookPage /> },
      { path: "/userproflie", element: <UserProfilePage /> },
      { path: "/setting", element: <SettingPage /> },
      { path: "/shelf", element: <ShelfPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckOutPage /> },
      { path: "/payment", element: <PaymentSuccess /> },
      { path: "/ButtonTest", element: <ButtonTest /> },
=======
      { path: '/home', element: <HomePage /> },
      { path: '/book/:bookId', element: <BookPage /> },
      { path: '/userproflie', element: <UserProfilePage /> },
      { path: '/setting', element: <SettingPage /> },
      { path: '/shelf', element: <ShelfPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckOutPage /> },
      { path: '/payment', element: <PaymentSuccess/>}
>>>>>>> Stashed changes
    ],
  },
]);

function AppRouter() {
<<<<<<< Updated upstream
  const user = 1;
  // const user = useUserStore(state => state.user) // กำหนดว่าใครเข้ามา จะเอามาจาก back แล้วใช้ useUserStore เช็ค กำหนดค่าเอา
  const finalRouter = user == 1 ? routerUser : routerGuest; //  เลือก เส้นทางตามตัวแปร user ที่เข้ามา
=======
      const user = 1
      // const user = useUserStore(state => state.user) // กำหนดว่าใครเข้ามา จะเอามาจาก back แล้วใช้ useUserStore เช็ค กำหนดค่าเอา
      const finalRouter = user == 1 ? routerGuest : routerUser//  เลือก เส้นทางตามตัวแปร user ที่เข้ามา 
>>>>>>> Stashed changes

  return (
    <Suspense fallback={<p>Loading</p>}>
      <RouterProvider router={finalRouter} />
    </Suspense>
  );
}
export default AppRouter;
