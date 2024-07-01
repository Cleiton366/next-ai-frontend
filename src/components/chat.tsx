import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { FaGoogle } from "react-icons/fa";
import { BiMenuAltLeft } from "react-icons/bi";
import { TbMessagePlus } from 'react-icons/tb'
import { LuArrowRightFromLine } from "react-icons/lu";
import Message from '@/interfaces/message'
import ChatSideMenu from './chat-side-menu'
import DropDownMenu from './dropdown-menu'
import User from '@/interfaces/user';
import { Chat as IChat } from "@/interfaces/chat";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import UserDropdownMenu from './user-dropdown-menu';

type message = {
  role: string,
  message: string,
  timestamp: string,
}
type Chat = {
  id: number,
  name: string,
  userId: string,
  messages: message[]
}

function setMessageStyle(role: string) {
  return role === 'user' ? 'self-end' : 'self-start'
}

export default function Chat({
  chats,
  setChats,
  setIsSideBarOpen,
  isSideBarOpen,
  currentChat,
  setCurrentChat,
  user
}: {
  chats: IChat[],
  setChats: Dispatch<SetStateAction<IChat[]>>,
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>,
  isSideBarOpen: boolean,
  currentChat: Message[],
  setCurrentChat: Dispatch<SetStateAction<Message[]>>,
  user: User | null
}) {
  const [chatSideMenu, setChatSideMenu] = useState<boolean>(false);

  useEffect(() => {

  }, [chatSideMenu]);

  return (
    <div className={`flex relative w-full min-h-svh ${chatSideMenu ? 'overflow-hidden' : ''}`}>
      {chatSideMenu ?
        <ChatSideMenu
          user={user}
          chats={chats}
          setChatSideMenu={setChatSideMenu}
          setCurrentChat={setCurrentChat}
        /> : null}
      <div className='flex flex-col w-full'>
        <div
          className={`bg-primary px-5 md:px-10 py-5 shadow-lg shadow-cyan-500/15 top-0
          ${chatSideMenu ? '' : 'sticky'}`}
        >
          <div className='hidden md:block'>
            <div className='flex justify-between'>
              <div className='flex items-center'>
                {!isSideBarOpen ? <LuArrowRightFromLine className='h-6 w-6 mr-5 cursor-pointer' onClick={() => setIsSideBarOpen(!isSideBarOpen)} /> : null}
                <DropDownMenu />
              </div>
              <div>
                {
                  user ?
                    <UserDropdownMenu user={user} type='small' />
                    :
                    <Button className='bg-accent border-[0.1rem] border-white/15'>
                      <FaGoogle className='md:h-5 md:w-5 mr-2' />
                      <span className='text-[8pt] md:text[14pt]'>Sign in with Google</span>
                    </Button>
                }
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center md:hidden'>
            <BiMenuAltLeft onClick={() => setChatSideMenu(true)} className='h-6 w-6 cursor-pointer' />
            <DropDownMenu />
            <TbMessagePlus className='h-6 w-6 cursor-pointer' />
          </div>
        </div>
        <div className="flex h-full md:h-[44rem] lg:h-[45rem] overflow-y-scroll scroll-smooth p-5 md:p-10 justify-center">
          <div className="flex flex-col w-full max-w-4xl">
            {
              currentChat.map((chat, i: number) => (
                <div key={i} className='flex flex-col'>
                  <div className={`my-2 ${setMessageStyle(chat.role)}`}>
                    <div className="max-w-[28rem]">
                      <div className={`px-3 py-2 rounded-lg 
                      ${chat.role === 'user' ? 'bg-secondary' : 'bg-accent'}`}>
                        <span className="text-[10pt]">{chat.message}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex w-full pt-3 justify-center 
                    ${chat.role === 'user' ? 'md:justify-end' : 'md:justify-start'}`}
                  >
                    <span className='text-[10pt] text-gray-500'>{chat.timestamp}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div
          className={`flex w-full justify-center bg-primary py-10 px-5 md:px-20 bottom-0
          ${chatSideMenu ? '' : 'sticky'}`}
        >
          <Input
            className='w-full md:max-w-[40rem] bg-accent p-5 border-white/15'
            type="text"
            placeholder="Message with NextAI"
          />
        </div>
      </div>
    </div>
  )
}