'use client';
import Chat from "@/components/chat";
import ChatList from "@/components/chat-list";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/user-context";
import { ChatEntity } from "@/entities/chat/chat-entity";
import ChatsServices from "@/services/chats-service";
import { UserEntity } from "@/entities/user/user-entity";

export default function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const [currentChat, setCurrentChat] = useState<ChatEntity | null>(null);
  const [chats, setChats] = useState<ChatEntity[]>([]);
  const [user, setUser] = useState<UserEntity | null>(useUser().user);
  const { getUser } = useUser();
  const chatsServices = new ChatsServices();

  useEffect(() => {                                                                                    
    if (!user) {
      const newUserObj = getUser();
      if (newUserObj) {
        setUser(newUserObj);
      }
    }
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      if (user) {
        const chats = await chatsServices.getChats(user.id);
        setChats(chats || []);
      }
    };
  
    if (user) {
      setCurrentChat(null);
      fetchChats();
    }
  }, [user]);

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
