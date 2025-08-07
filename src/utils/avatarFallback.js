export const getAvatarFallback = (name) => {
  // 1. ตรวจสอบว่ามีชื่อหรือไม่ ถ้าไม่มีให้คืนค่า Default
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return '<i class="fa-solid fa-user"></i>'; // หรือไอคอนรูปคน
  }

  // 2. ทำความสะอาดข้อมูล
  // - ลบ @gmail.com, .jpg, .png ออก
  // - แทนที่ . หรือ _ ด้วยช่องว่าง
  const cleanedName = name
    .replace(/@.*/, '')      // ลบส่วน @... ทั้งหมด
    .replace(/\.(jpg|jpeg|png|gif)$/i, '') // ลบนามสกุลไฟล์รูปภาพ
    .replace(/[._]/g, ' ')   // แทนที่ . หรือ _ ด้วยช่องว่าง
    .trim();                // ลบช่องว่างหัวท้าย

  // 3. แยกชื่อด้วยช่องว่าง
  const nameParts = cleanedName.split(' ').filter(part => part !== '');

  // 4. สร้างอักษรย่อตามเงื่อนไข
  if (nameParts.length >= 2) {
    // กรณีมี 2 คำขึ้นไป: เอาตัวแรกของคำแรก + ตัวแรกของคำสุดท้าย
    const firstNameInitial = nameParts[0][0];
    const lastNameInitial = nameParts[nameParts.length - 1][0];
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  } else if (nameParts.length === 1 && nameParts[0].length > 1) {
    // กรณีมีคำเดียว (และยาวกว่า 1 ตัวอักษร): เอา 2 ตัวแรก
    return nameParts[0].substring(0, 2).toUpperCase();
  } else if (nameParts.length === 1) {
    // กรณีมีคำเดียว และมีแค่ตัวอักษรเดียว
    return nameParts[0].toUpperCase();
  } else {
    // กรณีอื่นๆ ทั้งหมด
    return '<i class="fa-solid fa-user"></i>';
  }
};