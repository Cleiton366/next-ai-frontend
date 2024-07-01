import Message from '@/interfaces/message'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { LuTrash2 } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";
import { TbMessagePlus } from "react-icons/tb";
import { BiMenuAltRight } from "react-icons/bi";
import { Button } from './ui/button';
import { FaGoogle } from 'react-icons/fa';
import { Chat } from '@/interfaces/chat';
import User from '@/interfaces/user';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import UserDropdownMenu from './user-dropdown-menu';

export default function ChatSideMenu({
  chats,
  setCurrentChat,
  setChatSideMenu,
  user
}: {
  chats: Chat[],
  setCurrentChat: (messages: Message[]) => void,
  setChatSideMenu: (value: boolean) => void,
  user: User | null
}) {

  function handleSetCurrentChat(messages: Message[]) {
    setCurrentChat(messages);
    setChatSideMenu(false);
  }

  return (
    <div className='flex w-full min-h-svh fixed'>
      <div className="flex flex-col w-72 bg-primary">
        <div className='flex justify-between p-5'>
          <TbMessagePlus className='h-6 w-6 cursor-pointer' />
          <BiMenuAltRight
            className='h-6 w-6 cursor-pointer'
            onClick={() => setChatSideMenu(false)}
          />
        </div>
        <div className='flex flex-col h-96 overflow-scroll space-y-3 w-full grow'>
          {chats.length > 0 ?
            chats.map((chat, i: number) => (
              <div
                key={i}
                className="flex px-5 justify-between items-center hover:bg-secondary cursor-pointer"
                onClick={() => handleSetCurrentChat(chat.messages)}
              >
                <span className='text-[10pt] overflow-hidden w-44'>{chat.name}</span>
                <div>
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
                      <DropdownMenuItem className='p-0'>
                        <div className='w-full flex justify-between items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
                          <span>Delete</span>
                          <LuTrash2 />
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            )) :
            <div className='flex h-full justify-center items-center'>
              <p className='text-center text-white'>No chats yet</p>
            </div>
          }
        </div>
        {
          user ?
            <UserDropdownMenu user={user} type='medium' />
            :
            <div className='flex justify-center p-5 h-20'>
              <Button className='bg-accent border-[0.1rem] border-white/15'>
                <FaGoogle className='md:h-5 md:w-5 mr-2' />
                <span className='text-[8pt] md:text[14pt]'>Sign in with Google</span>
              </Button>
            </div>
        }
      </div>
      <div className='flex grow bg-black/80' />
    </div>
  )
}