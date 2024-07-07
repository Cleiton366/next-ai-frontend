import User from "@/interfaces/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MdLogout } from "react-icons/md";
import { Settings } from "./settings";
import { Archives } from "./archives";
import { UserEntity } from "@/entities/user/user-entity";

export default function UserDropdownMenu({
  user,
  type
}:
  {
    user: UserEntity,
    type: 'small' | 'medium'
  }) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-fit items-center gap-1" asChild>
        <div className={`cursor-pointer w-fit ${type === 'medium' ? 'flex flex-row gap-2 p-5 items-center' : ''}`}>
          <Avatar>
            <AvatarImage src={user.profilePicture} alt="User Picture" />
            <AvatarFallback>USER</AvatarFallback>
          </Avatar>
          {type === 'medium' ? <span>{user.name}</span> : null}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-secondary w-48'>
        <DropdownMenuItem className='p-0' onSelect={(e) => e.preventDefault()}>
          <Settings />
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0' onSelect={(e) => e.preventDefault()}>
          <Archives type='dropdown-item' />
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0'>
          <div className='w-full flex justify-between items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
            <span>Logout</span>
            <MdLogout />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}