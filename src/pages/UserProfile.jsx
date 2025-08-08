import { useEffect, useState } from "react";
import nothingPic from "../assets/nothing-pic.png";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "../stores/userStore";
import { getAvatarFallback } from "../utils/avatarFallback";
import { getMyFullProfile, getMyProfile } from "../api/userApi";
import bookManageStore from "../stores/booksManageStore";
import reviewManageStore from "../stores/reviewStore";
import { Badge } from "@/components/ui/badge";
import {
  SelectStyled,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Link } from "react-router";
import { getAllShelf } from "../api/shelfApi";
import { useNavigate } from "react-router";

function UserProfile() {
  const [loadingAI, setLoadingAI] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allshelf, setAllShelf] = useState([]);

  // --- Zustand Stores ---
  const { book, getBookById, getAiSuggestion } = bookManageStore();
  const { getAllReview, addReview } = reviewManageStore();
  const {
    userId,
    fullProfile,
    isLoading,
    setFullProfile,
    avatarUrl,
    userName,
  } = useUserStore();
  const navigate = useNavigate();

  console.log("avatarStore:", avatarUrl)
  console.log("userId:", userId)
  console.log("fullProfile:", fullProfile)
  // console.log("booktag:", fullProfile.bookTagPreference)
  const getSuprise = () => {
    // navigate('/home', { state: { recommendPrompt: fullProfile.bookTagPreference } });
    navigate('/home', { state: { prompt: fullProfile.bookTagPreference } });
  }


  const joinDate = new Date(fullProfile?.createdAt).toLocaleDateString(
    "en-EN",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        // CHANGED: แก้ไขการดึงและตั้งค่า State ให้ถูกต้องและปลอดภัยขึ้น
        const response = await getAllShelf();
        // ตรวจสอบให้แน่ใจว่า response.data เป็น array ก่อนจะ set state
        if (Array.isArray(response.data)) {
          setAllShelf(response.data);
        }

        const profileResponse = await getMyFullProfile(userId);
        setFullProfile(profileResponse.data.result);
      } catch (error) {
        console.error("Can't get data:", error);
      }
    };

    if (userId) {
      loadData();
    }
  }, [userId, setFullProfile]); // เพิ่ม dependency ให้ครบถ้วน

  // --- CHANGED: กรองข้อมูลหนังสือตามประเภทของชั้น ---
  // หมายเหตุ: แก้ไขค่า 'CURRENTLY_READING', 'FAVORITES', 'READ' ให้ตรงกับข้อมูลจริงจาก API ของคุณ
  const currentlyReadingBooks = allshelf.filter(
    (item) => item.shelfType === "CURRENTLY_READING",
  );
  const favoriteBooks = allshelf.filter(
    (item) => item.shelfType === "WISHLIST"
  );
  const alreadyReadBooks = allshelf.filter(
    (item) => item.shelfType === "READ"
  );
  // ตัวอย่างสำหรับ Wishlist จากข้อมูลที่คุณให้มา
  const wishlistBooks = allshelf.filter(
    (item) => item.shelfType === "WISHLIST"
  );


  return (
    <>
      <div className="bg-paper-elevation-6 text-text-primary flex min-h-[700px] justify-center">
        <div className="w-full max-w-lg pb-20">
          <div className="relative flex items-start gap-10 p-10">
            {/* Left Column */}
            <div className="relative flex w-full max-w-[480px] flex-col gap-8">
              <Button
                variant="outlined"
                color="secondary"
                size="medium"
                className="absolute top-0 right-0 w-25"
              >
                Edit profile
              </Button>
              <Avatar className="bg-black-main/80 text-white-main size-30">
                <AvatarImage src={fullProfile?.avatarUrl} alt="@shadcn" />
                <AvatarFallback className="text-white-main font-header text-[28px]">
                  {getAvatarFallback(userName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="h6">{userName}</div>
                <div className="flex gap-6">
                  <div className="flex gap-2">
                    <div className="subtitle-3">
                      {fullProfile?._count?.following}
                    </div>
                    <div className="text-text-disabled">Following</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="subtitle-3">
                      {fullProfile?.followerCount}
                    </div>
                    <div className="text-text-disabled">Followers</div>
                  </div>
                </div>
                <div className="text-text-disabled">Joined {joinDate}</div>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="flex h-8 px-3 text-secondary-main subtitle-4"
                >
                  <i className="fa-solid fa-edit"></i>
                  {fullProfile?.reviewCount}
                  <div className="">reviews</div>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex h-8 px-3 text-secondary-main subtitle-4"
                >
                  <i className="fa-solid fa-heart"></i>
                  {fullProfile?._count?.likes}
                  <div className="">likes</div>
                </Badge>
              </div>
              <div className="relative flex flex-col gap-8 p-6 rounded-lg bg-paper-elevation-8 shadow-card-3d text-text-secondary">

                <Button
                  variant="link"
                  color="secondary"
                  size="medium"
                  className="absolute underline hover:text-primary-main top-5 right-6 w-fit"
                >
                  <Link to="/shelf">
                    See all
                  </Link>
                </Button>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 subtitle-2">
                    {" "}
                    <div className="text-[16px]">
                      <i className="fa-solid fa-glasses text-10"></i>
                    </div>
                    Currently Reading
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {currentlyReadingBooks.length > 0 ? (
                      currentlyReadingBooks.map((item) => (
                        <div
                          key={item.bookId}
                          className="bg-secondary-lighter rounded shadow-book-lighting h-[128px] w-[84px]"
                        >
                          <img
                            src={item.book?.edition?.[0]?.coverImage} // Correct ✅
                            alt={item.book?.title}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="h-[128px] w-[84px] border rounded-lg flex items-center p-2 caption text-text-disabled">
                        No Currently Reading books yet.
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 subtitle-2">
                    <div className="text-[16px]">
                      <i className="fa-solid fa-book-heart text-10"></i>
                    </div>
                    Favorites
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {favoriteBooks.length > 0 ? (
                      favoriteBooks.map((item) => (
                        <div
                          key={item.bookId}
                          className="bg-secondary-lighter rounded shadow-book-lighting h-[128px] w-[84px]"
                        >
                          <img
                            src={item.book?.edition?.[0]?.coverImage} // Correct ✅
                            alt={item.book?.title}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="h-[128px] w-[84px] border rounded-lg flex items-center p-2 caption text-text-disabled">
                        No favorite books yet.
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 subtitle-2">
                    {" "}
                    <div className="text-[16px]">
                      <i className="fa-solid fa-clock-rotate-left text-10"></i>
                    </div>
                    Already Read
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {alreadyReadBooks.length > 0 ? (
                      alreadyReadBooks.map((item) => (
                        <div
                          key={item.bookId}
                          className="bg-secondary-lighter rounded shadow-book-lighting h-[128px] w-[84px]"
                        >
                          <img
                            src={item.book?.edition?.[0]?.coverImage} // Correct ✅
                            alt={item.book?.title}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="h-[128px] w-[84px] border rounded-lg flex items-center p-2 caption text-text-disabled">
                        No Read books yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3 subtitle-3">
                  Interested In
                </div>
                <div className="flex flex-wrap w-full gap-2">
                  {fullProfile?.bookTagPreference &&
                    fullProfile.bookTagPreference.length > 0 ? (
                    fullProfile.bookTagPreference.map((preference) => (
                      <Badge
                        key={preference.tag.id}
                        variant="secondary"
                        className="h-8 px-3 text-secondary-lighter subtitle-4 rounded-pill"
                      >
                        {preference.tag.name}
                      </Badge>
                    ))
                  ) : (
                    // ถ้าไม่มี ให้แสดงข้อความนี้แทน
                    <div className="caption text-text-disabled">
                      No interests selected yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col w-full gap-6">
              <div className="flex w-full gap-6">
                <div className="flex flex-col justify-end flex-1 gap-1 p-6 border rounded-lg text-tertiary-dark border-tertiary-outlinedBorder bg-tertiary-selected">
                  <div className="subtitle-2">Daily book recommendations</div>
                  <div className="body-2">
                    Allow our AI to recommend books tailored just for you.
                  </div>
                  <Button
                    variant="contained"
                    color="tertiary"
                    size="medium"
                    className="mt-2 w-fit"
                    onClick = {() => getSuprise()}
                  >
                    <i className="fa-solid fa-sparkles"></i>
                    Surprise Me
                  </Button>
                </div>
                <div className="flex flex-col justify-end flex-1 gap-1 p-6 border rounded-lg text-secondary-dark border-secondary-outlinedBorder bg-secondary-selected">
                  <div className="subtitle-2">Find a book to review?</div>
                  <div className="body-2">
                    Share your insights, earn your share!
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    className="mt-2 w-fit"
                  >
                    <i className="fa-solid fa-search"></i>
                    Browse a book
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-full subtitle-1 text-text-secondary">
                  Activities
                </div>
                <div className="w-[200px]">
                  <SelectStyled
                    variant="outlined"
                    size="small"
                    defaultValue="option1"
                    className="w-full"
                  >
                    <SelectContent>
                      <SelectItem value="option1">Newest</SelectItem>
                      <SelectItem value="option2">Oldest</SelectItem>
                      <SelectItem value="option3">New Activity</SelectItem>
                    </SelectContent>
                  </SelectStyled>
                </div>
              </div>
              <div className="p-6 rounded-lg bg-paper-elevation-8 shadow-card-3d">
                <div className="flex flex-col items-center gap-4 p-4">
                  <img
                    src={nothingPic}
                    alt="Nothing here"
                    className="h-[120px] w-[132px] object-cover"
                  />
                  <div className="text-center">
                    <div className="subtitle-1">Nothing here</div>
                    <div className="caption text-text-disabled">
                      Be the first to review this book!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
