export function formatNumber(num) {
  // ตรวจสอบว่าค่าที่รับมาเป็นตัวเลขที่ถูกต้องหรือไม่
  if (num === null || num === undefined || isNaN(num)) {
    return "0";
  }

  // ถ้าตัวเลขน้อยกว่า 1,000 ให้แสดงผลตามปกติ
  if (num < 1000) {
    return num.toString();
  }

  // ถ้าตัวเลขอยู่ในหลักพัน (1,000 - 999,999)
  if (num < 1000000) {
    // หารด้วย 1000 แล้วปัดเศษให้เหลือทศนิยม 1 ตำแหน่ง
    const formatted = (num / 1000).toFixed(1);
    // ถ้าผลลัพธ์ลงท้ายด้วย .0 ให้ตัดออก (เช่น 1.0K -> 1K)
    return formatted.endsWith('.0') ? formatted.slice(0, -2) + 'K' : formatted + 'K';
  }

  // ถ้าตัวเลขอยู่ในหลักล้าน (1,000,000 ขึ้นไป)
  const formatted = (num / 1000000).toFixed(1);
  return formatted.endsWith('.0') ? formatted.slice(0, -2) + 'M' : formatted + 'M';
}