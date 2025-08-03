import { Button } from "@/components/ui/button";
import React from "react";

function GuestNavbar() {
  return (
    <nav className="flex flex-row justify-between gap-2">
      <Button variant="text" asChild color="secondary">
        <a href="/login" target="_blank">
          Log in
        </a>
      </Button>
      <Button asChild color="primary">
        <a href="/register" target="_blank">
          Join Readit
        </a>
      </Button>
    </nav>
  );
}

export default GuestNavbar;
