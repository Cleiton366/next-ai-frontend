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
import { ChatEntity } from "@/entities/chat/chat-entity";
import ArchivesService from "@/services/archives-service";
import ChatsServices from "@/services/chats-service";
import useToast from "@/util/use-toast";
import { LuTrash2 } from "react-icons/lu";
import { PiArchiveDuotone } from "react-icons/pi";

export function ChatAlertDialog({
  tittle,
  description,
  type,
  updateChat,
  chat
}: {
  tittle: string,
  description: string,
  type: 'archive' | 'delete',
  updateChat(): Promise<void>
  chat: ChatEntity
}) {
  const chatsServices = new ChatsServices();
  const archivesService = new ArchivesService();

  const handleDeleteChat = async (): Promise<void> => {
    try {
      await chatsServices.deleteChat(chat.id);
      await updateChat();
      useToast('Success', 'Chat deleted');
    } catch (error) {
      useToast('Error', 'Failed to delete chat');
    }
  }

  const handleArchiveChat = async (): Promise<void> => {
    try {
      await archivesService.archiveChat(chat.id);
      await updateChat();
      useToast('Success', 'Chat archived');
    } catch (error) {
      useToast('Error', 'Failed to archive chat');
    }
  }

  function setDialogTrigger() {
    return type === 'archive' ?
      (
        <div className='w-full flex justify-between items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
          <span>Archive</span>
          <PiArchiveDuotone />
        </div>
      ) :
      (
        <div className='w-full flex justify-between items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
          <span>Delete</span>
          <LuTrash2 />
        </div>
      );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {setDialogTrigger()}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-zinc-900/95">
        <AlertDialogHeader>
          <AlertDialogTitle>{tittle}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-secondary hover:text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-accent" onClick={type === 'archive' ? handleArchiveChat : handleDeleteChat}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
