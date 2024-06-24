'use client';
import Chat from "@/components/chat";
import ChatList from "@/components/chat-list";
import { useState } from "react";

export default function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);

  return (
    <main className="flex min-h-screen flex-row items-center justify-between bg-primary" >
      <ChatList setIsSideBarOpen={setIsSideBarOpen} isSideBarOpen={isSideBarOpen}/>
      <Chat setIsSideBarOpen={setIsSideBarOpen} isSideBarOpen={isSideBarOpen}/>
    </main>
  );
}
