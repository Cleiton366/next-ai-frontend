'use client';
import Chat from "@/components/chat";
import ChatList from "@/components/chat-list";
import { Chat as IChat } from "@/interfaces/chat";
import Message from "@/interfaces/message";
import { useState } from "react";
export default function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const [currentChat, setCurrentChat] = useState<Message[]>([]);
  const [chats, setChats] = useState<IChat[]>([]);

  return (
    <main className="flex min-h-screen flex-row justify-between bg-zinc-900" >
      <ChatList
        chats={chats}
        setChats={setChats}
        setIsSideBarOpen={setIsSideBarOpen}
        isSideBarOpen={isSideBarOpen}
        setCurrentChat={setCurrentChat}
      />
      <Chat
        chats={chats}
        setChats={setChats}
        setIsSideBarOpen={setIsSideBarOpen}
        isSideBarOpen={isSideBarOpen}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        user={null}
      />
    </main>
  );
}
