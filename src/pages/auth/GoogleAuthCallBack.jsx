import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore'
import * as userApi from "../../api/userApi.js";


function GoogleAuthCallback() {
  const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const setTokenFromGoogle = useUserStore(state => state.setTokenFromGoogle);

    useEffect(() => {
        const handleAuth = async () => {
            const token = searchParams.get('token');
            if (token) {
                try {
                    // 1. ตั้งค่า token ใน store ก่อน เพื่อให้ API call ต่อไปมีสิทธิ์เข้าถึง
                    await setTokenFromGoogle(token);

                    // 2. เรียก API เพื่อดึงข้อมูลโปรไฟล์ทั้งหมดของผู้ใช้
                    const profileResponse = await userApi.getMyFullProfile();
                    const preferences = profileResponse.data?.result.bookTagPreference;

                    // 3. ตรวจสอบว่าผู้ใช้ได้เลือกความสนใจ (preferences) แล้วหรือยัง
                    if (preferences && preferences.length > 0) {
                        // ถ้ามีแล้ว ให้ไปที่หน้าโปรไฟล์
                        navigate('/userproflie', { replace: true });
                    } else {
                        // ถ้ายังไม่มี ให้ไปที่หน้าเลือกความสนใจ
                        navigate('/interest', { replace: true });
                    }

                } catch (error) {
                    console.error("Google Auth or Profile Fetch Failed:", error);
                    navigate('/login?error=auth_failed', { replace: true });
                }
            } else {
                // หากไม่มี token ใน URL
                navigate('/login?error=google_auth_failed', { replace: true });
            }
        };

        handleAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // ทำให้ useEffect ทำงานแค่ครั้งเดียว
  return <div>Loading, please wait...</div>;
}

export default GoogleAuthCallback;