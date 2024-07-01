'use client';
import Chat from "@/components/chat";
import ChatList from "@/components/chat-list";
import Message from "@/interfaces/message";
import { Chat as IChat } from "@/interfaces/chat";
import { useEffect, useState } from "react";
import User from "@/interfaces/user";
import {user as mockedUser} from '@/data'

export default function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const [currentChat, setCurrentChat] = useState<Message[]>([]);
  const [user, setUser] = useState<User | null>(mockedUser);
  const [chats, setChats] = useState<IChat[]>([]);

  useEffect(() => {
    if(user) {
      setCurrentChat(user?.chats[0].messages);
      setChats(user?.chats);
    }
  }, []);

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
        user={user}
      />
    </main>
  );
}
