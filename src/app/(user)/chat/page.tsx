'use client';
import Chat from "@/components/chat";
import ChatList from "@/components/chat-list";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/user-context";
import { ChatEntity } from "@/entities/chat/chat-entity";
import MessageEntity from "@/entities/message/message-entity";

export default function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const [currentChat, setCurrentChat] = useState<MessageEntity[]>([]);
  const [chats, setChats] = useState<ChatEntity[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if(user) {
      setCurrentChat([]);
      setChats(user?.chats || []);
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
