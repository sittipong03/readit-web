import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { Children, lazy, Suspense } from "react";

//store section
import useUserStore from "../stores/userStore";

//layout section
import GuestLayout from "../layouts/GuestLayout";
import UserLayout from "../layouts/UserLayout";

//page section
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
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
import GeneralSetting from "../pages/user/setting/GeneralSetting";
import PasswordSetting from "../pages/user/setting/PasswordSetting";
import PurchasesSetting from "../pages/user/setting/PurchaseSetting";
import AffiliateSetting from "../pages/user/setting/AffiliateSetting";
import EarningSetting from "../pages/user/setting/EarningSetting";
import ButtonTest from "../pages/test/ButtonTest";
import OrderDetail from "../components/setting/OrderDetail";
import PaymentSuccess from "../pages/user/PaymentSuccessPage";
import BookCard from "../components/BookCard";
import GoogleAuthCallback from "../pages/auth/GoogleAuthCallBack";

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
    path: "/auth/callback",
    element: <GoogleAuthCallback />,
  },

  {
    element: <GuestLayout />,
    children: [
      { path: "/homepage", element: <HomePage /> },
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
    element: <UserLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/home", element: <Home /> },
      { path: "/book/:bookId", element: <BookPage /> },
      { path: "/userproflie", element: <UserProfilePage /> },
      {
        path: "/setting",
        element: <SettingPage />,
        children: [
          { index: true, element: <Navigate to="general" replace /> },
          { path: "general", element: <GeneralSetting /> },
          { path: "password", element: <PasswordSetting /> },
          { path: "purchases", element: <PurchasesSetting /> },
          { path: "purchases/:id", element: <OrderDetail /> },
          { path: "affiliate", element: <AffiliateSetting /> },
          { path: "earning", element: <EarningSetting /> },
        ],
      },
      { path: "/shelf", element: <ShelfPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckOutPage /> },
      // { path: "/payment", element: <PaymentSuccess /> },
      { path: "/ButtonTest", element: <ButtonTest /> },
      { path: "/homepage", element: <HomePage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
]);

function AppRouter() {
  const role = useUserStore((state) => state.role); // กำหนดว่าใครเข้ามา จะเอามาจาก back แล้วใช้ useUserStore เช็ค กำหนดค่าเอา
  // test pull push
  console.log(role);
  const finalRouter =
    role === "USER" ? routerUser : role === "ADMIN" ? routerUser : routerGuest; //  เลือก เส้นทางตามตัวแปร user ที่เข้ามา

  return (
    <Suspense fallback={<p>Loading</p>}>
      <RouterProvider router={finalRouter} />
      {/* <RouterProvider router={routerUser} /> */}
    </Suspense>
  );
}
export default AppRouter;
