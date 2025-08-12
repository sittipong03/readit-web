import React from "react";
import { useLocation } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NormalSearchTab } from "../components/NormalSearchTab";
import { AiSearchTab } from "../components/AiSearchTab";
import { SparklesIcon } from "../components/icons/sparkles-icon";
import useBookManageStore from "../stores/booksManageStore";

function Home() {
  const receiveData = useLocation();
  const landingPageQuery = receiveData?.state?.prompt;

  const { activeHomeTab, setActiveHomeTab } = useBookManageStore();

  const handleTabClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const defaultTab = landingPageQuery ? "ai" : activeHomeTab;

  return (
    <div className="bg-paper-elevation-6 text-text-primary relative mt-[-60px] flex h-full min-h-screen justify-center gap-4 pb-10">
      <div className="min-h-screen w-full pt-20">
        {/* ถ้ามี query ส่งมา ให้เปิดแท็บ AI เป็น default */}
        <Tabs
          value={defaultTab}
          onValueChange={(newTab) => {
            setActiveHomeTab(newTab);
          }}
          className="flex h-full w-full"
        >
          <TabsList className="sticky top-16 grid h-fit w-[340px] grid-cols-2 gap-2 p-6">
            <TabsTrigger
              value="normal"
              onClick={handleTabClick}
              className="bg-primary-soft"
            >
              Browse
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              onClick={handleTabClick}
              className="data-[state=active]:bg-tertiary-selected data-[state=active]:text-tertiary-main text-tertiary-dark bg-tertiary-soft hover:bg-tertiary-hover data-[state=active]:outline-tertiary-outlinedBorder"
            >
              <SparklesIcon className="mr-0 h-4 w-4" />
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
