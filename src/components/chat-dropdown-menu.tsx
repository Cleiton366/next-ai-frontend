import { HiOutlineDotsVertical } from "react-icons/hi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { PiArchiveDuotone } from "react-icons/pi";
import { ChatAlertDialog } from "./chat-alert-dialog";
import { Settings } from "./settings";

export default function ChatDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <HiOutlineDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-secondary'>
        <DropdownMenuItem className='p-0'>
          <div className='w-full flex justify-between items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
            <span>Rename</span>
            <LuPencil />
          </div>
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