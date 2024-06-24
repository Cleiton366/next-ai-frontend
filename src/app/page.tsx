'use client';
import Chat from "@/components/chat";
import ChatList from "@/components/chat-list";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between bg-primary" >
      <ChatList />
      <Chat />
    </main>
  );
}
