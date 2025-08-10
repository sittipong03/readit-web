import React from "react";
import { useLocation } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NormalSearchTab } from "../components/NormalSearchTab";
import { AiSearchTab } from "../components/AiSearchTab";
import { SparklesIcon } from "../components/icons/sparkles-icon";

function Home() {
  const receiveData = useLocation();
  const landingPageQuery = receiveData?.state?.prompt;

  const handleTabClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-paper-elevation-6 text-text-primary relative flex min-h-screen h-full justify-center gap-4 pb-24 mt-[-60px]">
      <div className="w-full pt-20 min-h-screen">
        {/* ถ้ามี query ส่งมา ให้เปิดแท็บ AI เป็น default */}
        <Tabs
          defaultValue={landingPageQuery ? "ai" : "normal"}
          className="w-full flex h-full"
        >
          <TabsList className="sticky top-16 grid w-[340px] grid-cols-2 gap-2 p-6 h-fit">
            <TabsTrigger value="normal" onClick={handleTabClick} className="bg-primary-soft">
              Browse
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              onClick={handleTabClick}
              className="data-[state=active]:bg-tertiary-selected data-[state=active]:text-tertiary-main text-tertiary-dark bg-tertiary-soft hover:bg-tertiary-hover data-[state=active]:outline-tertiary-outlinedBorder"
            >
              <SparklesIcon className="mr-0 h-4 w-4 " />
              Librarian
            </TabsTrigger>
          </TabsList>

          <TabsContent value="normal" className="h-full" forceMount>
            <NormalSearchTab />
          </TabsContent>

          <TabsContent value="ai" className="h-full" forceMount>
            <AiSearchTab initialPrompt={landingPageQuery} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;
