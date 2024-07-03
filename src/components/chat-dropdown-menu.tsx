import { HiOutlineDotsVertical } from "react-icons/hi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChatAlertDialog } from "./chat-alert-dialog";
import { RenameChatDialog } from "./rename-chat-dialog";

export default function ChatDropdownMenu() {
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
          />
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0' onSelect={(e) => e.preventDefault()}>
          <ChatAlertDialog
            tittle="Archive Chat"
            description="Are you sure you want to archive this chat?"
            type="archive"
            action={() => console.log('archived')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0' onSelect={(e) => e.preventDefault()}>
          <ChatAlertDialog
            tittle="Delete Chat"
            description="Are you sure you want to delete this chat?"
            type="delete"
            action={() => console.log('deleted')}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}