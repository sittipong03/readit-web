import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // ให้ทำงานทุกครั้งที่ path ของ URL เปลี่ยน

  return null; // Component นี้ไม่ต้องแสดงผลอะไรบนหน้าจอ
}