export function formatIsbnForSearch(isbnString) {
  const cleanedIsbn = isbnString.replace(/[-\s]/g, "");

  // ตรวจสอบว่าเป็นตัวเลข 13 หลักหรือไม่
  if (/^\d{13}$/.test(cleanedIsbn)) {
    return [
      cleanedIsbn.slice(0, 3),
      cleanedIsbn.slice(3, 13),
    ].join("-");
  }
  return isbnString;
}
