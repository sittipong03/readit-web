import { Button } from "../../components/ui/button";
import { getAllTags } from "../api/tagApi";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { updateUserPreferences } from "../api/userApi";
import { toast, Toaster } from "sonner";
import { Check, ChevronRight } from "lucide-react";
import bookManageStore from "../stores/booksManageStore";
import { Navigate } from "react-router";


function Interest() {
  const [tags, setTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [selectedTagNames, setSelectedTagNames] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  
  console.log('selectedTagNames', selectedTagNames)

  useEffect(() => {
     getAllTags().then((response) => {
        if (Array.isArray(response)) {
          setTags(response);
        } else if (response && Array.isArray(response.data)) {
          setTags(response.data);
        }
      });
    
  }, [isSubmitting]);


  const handleTagClick = (tagId, tagName) => {
    // เช็คว่า tag นี้ถูกเลือกอยู่แล้วหรือไม่
    if (selectedTagIds.includes(tagId)) {
      // ถ้าถูกเลือกแล้ว -> ให้เอาออกจาก array (Deselect)
      setSelectedTagIds(selectedTagIds.filter((id) => id !== tagId));
    } else {
      // ถ้ายังไม่ถูกเลือก -> ให้เพิ่มเข้าไปใน array (Select)
      // แต่ต้องเช็คก่อนว่าเลือกครบ 8 อันหรือยัง
      if (selectedTagIds.length < 8) {
        setSelectedTagIds([...selectedTagIds, tagId]);
        setSelectedTagNames([...selectedTagNames, tagName]);
      } else {
        toast.error("You can select a maximum of 8 genres.");
      }
    }
  };

  const handleNextClick = async () => {
    
    // กันการกดปุ่มซ้ำ
    if (selectedTagIds.length < 5) {
      toast.error("Please select at least 5 genres.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateUserPreferences(selectedTagIds);
      // await getBookByTag(selectedTagNames)
      toast.success("Preferences saved successfully!");
      Navigate('/home');
      // window.location.href = "/home";
    } catch (error) {
      toast.error("Failed to save preferences. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dark">
      <div className="bg-paper-elevation-6 flex min-h-[calc(100dvh-(60px))] flex-col items-center justify-center gap-10 p-30">
        <div className="flex w-full max-w-lg flex-col items-center gap-4">
          <div className="display-3 text-text-primary text-center">
            What are you interested?
          </div>
          <div className="body-1 text-text-disabled w-140 text-center">
            Select at least 5 genres. ({selectedTagIds.length}/8)
          </div>
          <div className="mt-4 w-full max-w-lg"></div>
          <div className="mb-8 flex w-full flex-wrap justify-center gap-2">
            {tags.map((tag) => {
              // เช็คว่า tag ปัจจุบันใน loop ถูกเลือกหรือไม่
              const isSelected = selectedTagIds.includes(tag.id);

              return (
                <Badge
                  onClick={() => handleTagClick(tag.id, tag.name)}
                  className={
                    isSelected
                      ? "text-tertiary-lighter subtitle-4 rounded-pill bg-tertiary-main h-8 cursor-pointer px-3"
                      : "text-secondary-lighter subtitle-4 rounded-pill h-8 cursor-pointer px-3"
                  }
                  variant="secondary"
                  key={tag.id}
                >
                  <React.Fragment>
                    {isSelected && (
                      // 2. เรียกใช้งานเป็น Component และปรับแต่งผ่าน props
                      <Check className="mr-0 !size-4" strokeWidth={4} />
                    )}
                    <span className="pointer-events-none">{tag.name}</span>
                  </React.Fragment>
                </Badge>
              );
            })}
          </div>
          <Button
            color="primary"
            variant="contained"
            size="large"
            className="w-60"
            disabled={selectedTagIds.length < 5 || isSubmitting}
            onClick={handleNextClick}
          >
            {isSubmitting ? "Saving..." : "Next"}
            {!isSubmitting && (
            //   <i className="fa-solid fa-chevron-right ml-2"></i>
              <ChevronRight className="mr-0 !size-4" strokeWidth={3} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Interest;
