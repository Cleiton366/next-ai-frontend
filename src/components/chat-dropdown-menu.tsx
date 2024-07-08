import { HiOutlineDotsVertical } from "react-icons/hi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChatAlertDialog } from "./chat-alert-dialog";
import { RenameChatDialog } from "./rename-chat-dialog";
import { ChatEntity } from "@/entities/chat/chat-entity";
import ChatsServices from "@/services/chats-service";
import { Dispatch, SetStateAction, use, useEffect } from "react";
import useToast from "@/util/use-toast";
import { useUser } from "@/contexts/user-context";


export default function ChatDropdownMenu({
  chat,
  setChats
}: {
  chat: ChatEntity,
  setChats: Dispatch<SetStateAction<ChatEntity[]>>,
}) {
  const chatsServices = new ChatsServices();
  const { user } = useUser();

  async function updateChat() {
    const chats = await chatsServices.getChats(user!.id);
    if (!chat || !chats) {
      useToast('Error', 'Failed to update chat list');
      return;
    } else {
      setChats(chats);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <HiOutlineDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-secondary'>
        <DropdownMenuItem className='p-0' onSelect={(e) => e.preventDefault()}>
          <RenameChatDialog
            tittle="Rename Chat"
            description="Type here new chat name"
            updateChat={updateChat}
            chat={chat}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0' onSelect={(e) => e.preventDefault()}>
          <ChatAlertDialog
            tittle="Archive Chat"
            description="Are you sure you want to archive this chat?"
            type="archive"
            updateChat={updateChat}
            chat={chat}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0' onSelect={(e) => e.preventDefault()}>
          <ChatAlertDialog
            tittle="Delete Chat"
            description="Are you sure you want to delete this chat?"
            type="delete"
            updateChat={updateChat}
            chat={chat}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}