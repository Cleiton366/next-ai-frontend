import { TbMessagePlus } from "react-icons/tb";
import { LuArrowLeftFromLine } from "react-icons/lu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Dispatch, SetStateAction } from 'react';
import { Button } from './ui/button';
import ChatDropdownMenu from './chat-dropdown-menu';
import { ChatEntity } from '@/entities/chat/chat-entity';

export default function ChatList({
  chats,
  setChats,
  setIsSideBarOpen,
  isSideBarOpen,
  setCurrentChat
}: {
  chats: ChatEntity[],
  setChats: Dispatch<SetStateAction<ChatEntity[]>>,
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>,
  isSideBarOpen: boolean,
  setCurrentChat: Dispatch<SetStateAction<ChatEntity | null>>
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
                  onClick={() => setCurrentChat(chat)}
                >
                  <span className='text-[10pt] overflow-hidden w-44'>{chat.name}</span>
                  <ChatDropdownMenu
                    chat={chat}
                    setCurrentChat={setCurrentChat}
                    setChats={setChats}
                  />
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