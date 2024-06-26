'use client';
import Chat from "@/components/chat";
import ChatList from "@/components/chat-list";
import Message from "@/interfaces/message";
import { useState } from "react";
import { chats } from '../data'

export default function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const [currentChat, setCurrentChat] = useState<Message[]>(chats[0].messages)

  return (
    <main className="flex min-h-screen flex-row items-center justify-between bg-zinc-900" >
      <ChatList
        setIsSideBarOpen={setIsSideBarOpen}
        isSideBarOpen={isSideBarOpen}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
      <Chat
        setIsSideBarOpen={setIsSideBarOpen}
        isSideBarOpen={isSideBarOpen}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
    </main>
  );
}
