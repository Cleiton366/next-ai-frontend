import { chats } from '../data'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TbMessagePlus } from "react-icons/tb";
import { LuArrowLeftFromLine } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useState } from 'react';

export default function ChatList() {
  const [isOpen, setIsOpen] = useState(true);

  function handleCloseSidebar() {
    setIsOpen(false);
  }

  function handleNewChat() {

  }

  return (
    isOpen &&
    <div className='hidden md:block'>
      <div className="h-svh overflow-x-scroll md:max-w-64 border border-y-0 border-l-0 border-white/15">
        <div className='flex flex-col'>
          <div className='flex justify-between py-7 px-3'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <LuArrowLeftFromLine
                    className='h-6 w-6 cursor-pointer'
                    onClick={handleCloseSidebar}
                  />
                </TooltipTrigger >
                <TooltipContent className='bg-secondary text-white'>
                  <p>Close sidebar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TbMessagePlus className='h-6 w-6 cursor-pointer' />
                </TooltipTrigger>
                <TooltipContent className='bg-secondary text-white'>
                  <p>New chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {chats.map((chat, i: number) => (
            <div key={i} className="">
              <div className="flex w-64 h-16 px-2 justify-between items-center hover:bg-secondary">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}