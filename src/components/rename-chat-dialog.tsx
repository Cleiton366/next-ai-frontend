import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LuPencil } from "react-icons/lu";
import { Input } from "./ui/input";
import { useState } from "react";
import ChatsServices from "@/services/chats-service";
import useToast from "@/util/use-toast";
import { ChatEntity } from "@/entities/chat/chat-entity";

export function RenameChatDialog({
  tittle,
  description,
  updateChat,
  chat
}: {
  tittle: string,
  description: string,
  updateChat(): Promise<void>,
  chat: ChatEntity
}) {
  const [newChatName, setNewChatName] = useState<string>('');
  const chatsServices = new ChatsServices();

  const handleRenameChat = async (): Promise<void> => {
    try {
      await chatsServices.renameChat(chat.id, newChatName);
      await updateChat();
      setNewChatName('');
      useToast('Success', 'Chat renamed');
    } catch (error) {
      useToast('Error', 'Failed to rename chat');
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className='w-full flex justify-between items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
          <span>Rename</span>
          <LuPencil />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent
        className="bg-zinc-900/95"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onPointerMove={(e) => e.stopPropagation()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{tittle}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
          <div>
            <Input
              type="text"
              className="w-full md:max-w-[40rem] bg-accent p-5 border-white/15"
              onChange={(e) => setNewChatName(e.target.value)}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-secondary hover:text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-accent" onClick={handleRenameChat}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
