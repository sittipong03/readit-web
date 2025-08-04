import React from "react";
import { Outlet } from "react-router";
import SettingSidebar from "@/src/components/setting/SettingSidebar";
import { Button } from "@/components/ui/button";
function Setting() {
  return (
    <div className="bg-paper-elevation-6 container mx-auto flex gap-12 py-10">
      <SettingSidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
export default Setting;
