'use client';
import Chat from "@/components/chat";
import ChatList from "@/components/chat-list";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/user-context";
import { UserEntity } from "@/entities/user/user-entity";

export default function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const {
    user,
    setUser,
    getUser,
    fetchChats,
  } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const newUserObj = await getUser();
        if (newUserObj) {
          setUser(newUserObj);
        }
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) fetchChats();
  }, [user]);

  return (
    <main className="flex h-svh flex-row justify-between bg-zinc-900" >
      <ChatList
        setIsSideBarOpen={setIsSideBarOpen}
        isSideBarOpen={isSideBarOpen}
      />
      <Chat
        setIsSideBarOpen={setIsSideBarOpen}
        isSideBarOpen={isSideBarOpen}
      />
    </main>
  );
}
