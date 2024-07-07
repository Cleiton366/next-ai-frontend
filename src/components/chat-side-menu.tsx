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
import ChatDropdownMenu from './chat-dropdown-menu';
import { UserEntity } from '@/entities/user/user-entity';
import MessageEntity from '@/entities/message/message-entity';
import { ChatEntity } from '@/entities/chat/chat-entity';

export default function ChatSideMenu({
  chats,
  setCurrentChat,
  setChatSideMenu,
  user
}: {
  chats: ChatEntity[],
  setCurrentChat: (messages: MessageEntity[]) => void,
  setChatSideMenu: (value: boolean) => void,
  user: UserEntity | null
}) {

  function handleSetCurrentChat(messages: MessageEntity[]) {
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
              >
                <div
                  className='min-h-12 w-full'
                  onClick={() => handleSetCurrentChat(chat.messages)}
                >
                  <div className='w-40'>
                  <span className='text-[10pt] overflow-hidden'>{chat.name}</span>
                  </div>
                </div>
                <ChatDropdownMenu />
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