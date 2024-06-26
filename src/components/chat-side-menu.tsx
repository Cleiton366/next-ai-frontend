import Message from '@/interfaces/message'
import { chats } from '../data'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { LuTrash2 } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";
import { TbMessagePlus } from "react-icons/tb";
import { BiMenuAltRight } from "react-icons/bi";
import { Button } from './ui/button';
import { FaGoogle } from 'react-icons/fa';

export default function ChatSideMenu({
  setCurrentChat,
  setChatSideMenu
}: {
  setCurrentChat: (messages: Message[]) => void,
  setChatSideMenu: (value: boolean) => void
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
        <div className='flex flex-col space-y-3 w-full grow'>
          {chats.map((chat, i: number) => (
            <div
              key={i}
              className="flex overflow-scroll px-5 justify-between items-center hover:bg-secondary cursor-pointer"
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
          ))}
        </div>
        <div className='flex justify-center p-5'>
          <Button className='bg-accent border-[0.1rem] border-white/15'>
            <FaGoogle className='md:h-5 md:w-5 mr-2' />
            <span className='text-[8pt] md:text[14pt]'>Sign in with Google</span>
          </Button>
        </div>
      </div>
      <div className='flex grow bg-black/80' />
    </div>
  )
}