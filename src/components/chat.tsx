import { Dispatch, LegacyRef, SetStateAction, use, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { FaGoogle } from "react-icons/fa";
import { BiMenuAltLeft } from "react-icons/bi";
import { TbMessagePlus } from 'react-icons/tb'
import { LuArrowRightFromLine } from "react-icons/lu";
import ChatSideMenu from './chat-side-menu'
import DropDownMenu from './models-dropdown-menu'
import UserDropdownMenu from './user-dropdown-menu';
import { ChatEntity } from '@/entities/chat/chat-entity';
import MessageEntity from '@/entities/message/message-entity';
import { UserEntity } from '@/entities/user/user-entity';
import MessagesService from '@/services/messages-service';
import ChatsServices from '@/services/chats-service';
import { useRef } from 'react';
import useToast from '@/util/use-toast';
import { ScrollArea } from './ui/scroll-area';

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
  chats: ChatEntity[],
  setChats: Dispatch<SetStateAction<ChatEntity[]>>,
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>,
  isSideBarOpen: boolean,
  currentChat: ChatEntity | null,
  setCurrentChat: Dispatch<SetStateAction<ChatEntity | null>>,
  user: UserEntity | null
}) {
  const [chatSideMenu, setChatSideMenu] = useState<boolean>(false);
  const messagesServices = new MessagesService();
  const chatsServices = new ChatsServices();
  var chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentChat?.messages) {
      scrollChatToBottom();
    }
  }, [currentChat])

  async function handleSendMessage(message: string) {
    const chat = currentChat ? currentChat : await createChat(message);

    if (!chat) {
      useToast('Error', 'Failed to create chat');
      return;
    }
    const userMessage: MessageEntity = {
      chatId: chat.id,
      id: '',
      message: message,
      role: 'user',
      timestamp: new Date()
    }

    const newCurrentChat = {
      ...chat,
      messages: chat.messages.concat(userMessage)
    }
    setCurrentChat(newCurrentChat);

    const reply = await messagesServices.postMessage({
      role: 'user',
      message: message,
      chatId: chat.id
    });

    if (!reply) {
      useToast('Error', 'Failed to send message');
      return;
    }

    await updateChat(chat.id);
  }

  async function createChat(message: string): Promise<ChatEntity | null> {
    const newChat: ChatEntity | null = await chatsServices.createChat({
      name: message,
      userId: user?.id || ''
    });
    return newChat ? newChat : null;
  }

  async function updateChat(currentChatId: string) {
    const chats = await chatsServices.getChats(user?.id || '');
    const chat = chats?.find(chat => chat.id === currentChatId);
    if (!chat || !chats) {
      useToast('Error', 'Failed to update chat');
      return;
    } else {
      setChats(chats);
      setCurrentChat(chat);
    }
  }

  const handleKeyUp = async (event: any) => {
    if (event.keyCode === 13) {
      const msg = event.target.value;
      event.target.value = '';
      await handleSendMessage(msg);
    }
  };

  function formatTimestampToHour(timestamp: Date) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  function scrollChatToBottom() {
    if (chatContainerRef.current) chatContainerRef.current.scrollIntoView(false);
  }

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
          <div className="flex flex-col w-full max-w-5xl">
            <ScrollArea className='px-5'>
              {
                currentChat?.messages.map((chat, i: number) => (
                  <div key={i} className='flex flex-col' ref={chatContainerRef}>
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
                      <span className='text-[10pt] text-gray-500'>
                        {formatTimestampToHour(chat.timestamp)}
                        {chat.role !== 'user' ? ` - ${chat.role}` : ''}
                      </span>
                    </div>
                  </div>
                ))
              }
            </ScrollArea>
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
            onKeyUp={handleKeyUp}
          />
        </div>
      </div>
    </div>
  )
}