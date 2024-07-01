import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TbMessagePlus } from "react-icons/tb";
import { LuArrowLeftFromLine } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Dispatch, SetStateAction } from 'react';
import Message from '@/interfaces/message';
import { Chat } from '@/interfaces/chat';
import { Button } from './ui/button';

export default function ChatList({
  chats,
  setChats,
  setIsSideBarOpen,
  isSideBarOpen,
  setCurrentChat
}: {
  chats: Chat[],
  setChats: Dispatch<SetStateAction<Chat[]>>,
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>,
  isSideBarOpen: boolean,
  setCurrentChat: Dispatch<SetStateAction<Message[]>>
}) {

  function handleCloseSidebar() {
    setIsSideBarOpen(false);
  }

  function handleNewChat() {

  }

  return (
    isSideBarOpen &&
    <div className='hidden md:block'>
      <div className="h-svh overflow-x-scroll md:min-w-64 border border-y-0 border-l-0 border-white/15">
        <div className='flex h-full flex-col'>
          <div className='flex justify-between py-7 px-3'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className='p-0 h-fit' onClick={handleCloseSidebar}>
                    <LuArrowLeftFromLine className='h-6 w-6' />
                  </Button>
                </TooltipTrigger >
                <TooltipContent className='bg-secondary text-white'>
                  <p>Close sidebar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className='p-0 h-fit' onClick={handleCloseSidebar}>
                    <TbMessagePlus className='h-6 w-6' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-secondary text-white'>
                  <p>New chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className='h-full overflow-scroll mb-10'>
            {chats.length > 0 ?
              chats.map((chat, i: number) => (
                <div
                  key={i}
                  className="flex w-64 h-16 px-2 justify-between items-center hover:bg-secondary cursor-pointer"
                  onClick={() => setCurrentChat(chat.messages)}
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
              ))
              :
              <div className='flex h-full justify-center items-center'>
                <p className='text-center text-white'>No chats yet</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}