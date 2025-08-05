import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore'

function GoogleAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setTokenFromGoogle  = useUserStore(state => state.setTokenFromGoogle); // เรียกใช้ action จาก store

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // เมื่อได้ token มาแล้ว ให้เรียก action ใน store เพื่อจัดการ
      setTokenFromGoogle(token);
      // เมื่อจัดการเสร็จแล้ว ให้ redirect ไปหน้าหลักหรือ dashboard
      navigate('/'); 
    } else {
      // ถ้าไม่มี token ให้ redirect ไปหน้า login พร้อม error
      navigate('/login?error=google_auth_failed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ให้ทำงานแค่ครั้งเดียวตอนหน้านี้โหลด

  return <div>Loading, please wait...</div>;
}

export default GoogleAuthCallback;