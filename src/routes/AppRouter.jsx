import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { Children, lazy, Suspense } from "react";
import ScrollToTop from "../components/ScrollToTop";

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
import UserProfile from "../pages/UserProfile";
import Interest from "../pages/Interest";
import { Outlet } from "react-router";

/**
 * Component นี้จะทำหน้าที่เลือก Layout ที่เหมาะสม (UserLayout หรือ GuestLayout)
 * โดยขึ้นอยู่กับสถานะการล็อกอินของผู้ใช้
 * ทั้ง UserLayout และ GuestLayout ควรจะมี <Outlet /> อยู่ข้างในเพื่อ render child routes
 */
const DynamicLayout = () => {
  const role = useUserStore((state) => state.role);
  // **สำคัญ:** ควรมี state สำหรับเช็คสถานะ loading การยืนยันตัวตนใน store ของคุณ
  // const isAuthLoading = useUserStore((state) => state.isAuthLoading);
  // if (isAuthLoading) {
  //   return <p>Loading user...</p>;
  // }

  return (role === 'USER' || role === 'ADMIN') ? <UserLayout /> : <GuestLayout />;
};

/**
 * Component นี้ใช้สำหรับป้องกัน Route ที่ต้องการให้ User ที่ล็อกอินแล้วเท่านั้นที่เข้าถึงได้
 * หากยังไม่ได้ล็อกอิน จะถูก redirect ไปที่หน้า /login
 */
const ProtectedRoute = () => {
    const role = useUserStore((state) => state.role);
    // คุณอาจจะอยากเช็ค isAuthLoading ที่นี่ด้วยก็ได้
    return (role === 'USER' || role === 'ADMIN') ? <Outlet /> : <Navigate to="/login" replace />;
}

/**
 * Component นี้ใช้สำหรับ Route ที่ต้องการให้ Guest เท่านั้นที่เข้าถึงได้ (เช่น หน้า Login)
 * หาก User ล็อกอินอยู่แล้วพยายามเข้าหน้านี้ จะถูก redirect ไปที่หน้า /home
 */
const GuestOnlyRoute = () => {
    const role = useUserStore((state) => state.role);
    return (role === 'USER' || role === 'ADMIN') ? <Navigate to="/home" replace /> : <Outlet />;
}


// สร้าง Router เพียงตัวเดียวที่รวมทุก Routes ไว้ด้วยกัน
const router = createBrowserRouter([
    {
        // --- Routes ที่ผู้ใช้ทั่วไป (Guest) เข้าถึงได้ ---
        // หาก user ที่ login แล้วพยายามเข้าหน้า login/register จะถูก redirect
        element: <GuestLayout />,
        children: [
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
        ]
    },
    {
        // --- Routes ที่ต้อง Login ก่อนถึงจะเข้าได้ ---
        element: <ProtectedRoute />,
        children: [
            // Routes กลุ่มนี้จะถูกแสดงผลภายใต้ UserLayout เพราะ DynamicLayout จะเลือกให้เอง
            {
                element: <UserLayout />, // ใช้ UserLayout สำหรับกลุ่มนี้โดยเฉพาะ
                children: [
                    { path: "/interest", element: <Interest /> },
                    { path: "/userproflie", element: <UserProfile /> },
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
                    { path: "/ButtonTest", element: <ButtonTest /> },
                ]
            }
        ]
    },
    {
        // --- Routes ที่เข้าได้ทั้ง Guest และ User แต่ Layout จะเปลี่ยนไปตามสถานะ Login ---
        element: <DynamicLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/home", element: <Home /> },
            { path: "/homepage", element: <HomePage /> },
            { path: "/book/:bookId", element: <BookPage /> },
            { path: "/book", element: <Home /> }, // อาจจะซ้ำซ้อนกับ /home
            { path: "/review/:bookId", element: <ReviewPage /> },
        ]
    },
    {
        // --- Routes พิเศษที่ไม่มี Layout ---
        path: "/auth/callback",
        element: <GoogleAuthCallback />,
    },
    {
        // --- Catch-all Route ---
        // หากไม่พบ path ที่ตรงกัน ให้ redirect ไปหน้าแรก
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);


function AppRouter() {
  // AppRouter จะเรียบง่ายขึ้นมาก เหลือแค่ทำหน้าที่ส่ง router ที่สร้างไว้ไปให้ RouterProvider
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default AppRouter;