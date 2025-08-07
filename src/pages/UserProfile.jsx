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

function UserProfile() {
  const [loadingAI, setLoadingAI] = useState(false);
  const [loading, setLoading] = useState(true);

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

  console.log("avatarStore:", avatarUrl)
  console.log("userId:", userId)
  console.log("fullProfile:", fullProfile)

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
      if (userId) {
        try {
          const data = await getMyFullProfile(userId);
          console.log("Full data fetched successfully:", data.data.result);
          setFullProfile(data.data.result);
        } catch (error) {
          console.error("Error fetching full profile:", error);
        }
      }
    };

    loadData();
  }, [userId, setFullProfile]);

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
                  className="text-secondary-main subtitle-4 flex h-8 px-3"
                >
                  <i className="fa-solid fa-edit"></i>
                  {fullProfile?.reviewCount}
                  <div className="">reviews</div>
                </Badge>
                <Badge
                  variant="outline"
                  className="text-secondary-main subtitle-4 flex h-8 px-3"
                >
                  <i className="fa-solid fa-heart"></i>
                  {fullProfile?._count?.likes}
                  <div className="">likes</div>
                </Badge>
              </div>
              <div className="bg-paper-elevation-8 shadow-card-3d text-text-secondary relative flex flex-col gap-8 rounded-lg p-6">
                <Button
                  variant="link"
                  color="secondary"
                  size="medium"
                  className="hover:text-primary-main absolute top-5 right-6 w-fit underline"
                >
                  See all
                </Button>
                <div className="flex flex-col gap-4">
                  <div className="subtitle-2 flex items-center gap-2">
                    {" "}
                    <div className="text-[16px]">
                      <i className="fa-solid fa-glasses text-10"></i>
                    </div>
                    Currently Reading
                  </div>
                  <div className="bg-secondary-lighter shadow-book-lighting h-[128px] w-[84px]">
                    <img
                      src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1721918653l/198902277.jpg"
                      alt="Book Cover Title"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="subtitle-2 flex items-center gap-2">
                    {" "}
                    <div className="text-[16px]">
                      <i className="fa-solid fa-book-heart text-10"></i>
                    </div>
                    Favorites
                  </div>
                  <div className="bg-secondary-lighter shadow-book-lighting h-[128px] w-[84px]">
                    <img
                      src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1721918653l/198902277.jpg"
                      alt="Book Cover Title"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="subtitle-2 flex items-center gap-2">
                    {" "}
                    <div className="text-[16px]">
                      <i className="fa-solid fa-clock-rotate-left text-10"></i>
                    </div>
                    Already Read
                  </div>
                  <div className="bg-secondary-lighter shadow-book-lighting h-[128px] w-[84px]">
                    <img
                      src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1721918653l/198902277.jpg"
                      alt="Book Cover Title"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="subtitle-3 flex items-center gap-2 mb-3">
                  Interested In
                </div>
                <div className="flex gap-2 flex-wrap w-full">
                  {fullProfile?.bookTagPreference &&
                  fullProfile.bookTagPreference.length > 0 ? (
                    fullProfile.bookTagPreference.map((preference) => (
                      <Badge
                        key={preference.tag.id}
                        variant="secondary"
                        className="text-secondary-lighter subtitle-4 rounded-pill h-8 px-3"
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
            <div className="flex w-full flex-col gap-6">
              <div className="flex w-full gap-6">
                <div className="text-tertiary-dark border-tertiary-outlinedBorder bg-tertiary-selected flex flex-1 flex-col justify-end gap-1 rounded-lg border p-6">
                  <div className="subtitle-2">Daily book recommendations</div>
                  <div className="body-2">
                    Allow our AI to recommend books tailored just for you.
                  </div>
                  <Button
                    variant="contained"
                    color="tertiary"
                    size="medium"
                    className="mt-2 w-fit"
                  >
                    <i className="fa-solid fa-sparkles"></i>
                    Surprise Me
                  </Button>
                </div>
                <div className="text-secondary-dark border-secondary-outlinedBorder bg-secondary-selected flex flex-1 flex-col justify-end gap-1 rounded-lg border p-6">
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
                <div className="subtitle-1 text-text-secondary w-full">
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
              <div className="bg-paper-elevation-8 shadow-card-3d rounded-lg p-6">
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
