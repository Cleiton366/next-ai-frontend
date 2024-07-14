import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { BiMenuAltLeft } from "react-icons/bi";
import { TbMessagePlus } from 'react-icons/tb'
import { LuArrowRightFromLine } from "react-icons/lu";
import ChatSideMenu from './chat-side-menu'
import DropDownMenu from './models-dropdown-menu'
import UserDropdownMenu from './user-dropdown-menu';
import { ChatEntity } from '@/entities/chat/chat-entity';
import MessageEntity from '@/entities/message/message-entity';
import MessagesService from '@/services/messages-service';
import ChatsServices from '@/services/chats-service';
import { useRef } from 'react';
import useToast from '@/util/use-toast';
import { ScrollArea } from './ui/scroll-area';
import { CircularProgress } from '@mui/material';
import { marked } from "marked";
import { useUser } from '@/contexts/user-context';

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

export default function Chat({
  setIsSideBarOpen,
  isSideBarOpen,
}: {
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>,
  isSideBarOpen: boolean,
}) {
  const [chatSideMenu, setChatSideMenu] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesServices = new MessagesService();
  const chatsServices = new ChatsServices();
  var chatContainerRef = useRef<HTMLDivElement>(null);
  const {
    user,
    currentChat,
    setCurrentChat,
    chats,
    setChats,
  } = useUser();

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
    setIsTyping(true);

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
      setIsTyping(false);
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

  function setMessageStyle(role: string) {
    return role === 'user' ? 'self-end' : 'self-start'
  }

  function getMarkdownText(content: string) {
    var rawMarkup = marked.parse(content);
    return { __html: rawMarkup };
  }

  return (
    <div className={`flex relative w-full min-h-svh ${chatSideMenu ? 'overflow-hidden' : ''}`}>
      {chatSideMenu ?
        <ChatSideMenu setChatSideMenu={setChatSideMenu} /> : null}
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
                    <UserDropdownMenu type='small' /> : null
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
              <div ref={chatContainerRef}>
                {
                  currentChat?.messages.map((chat, i: number) => (
                    <div
                      key={i}
                      className='flex flex-col'
                    >
                      <div className={`my-2 ${setMessageStyle(chat.role)}`}>
                        <div className="max-w-[40rem]">
                          <div className={`px-3 py-2 rounded-lg 
                      ${chat.role === 'user' ? 'bg-secondary' : 'bg-accent'}`}>
                            {
                              chat.role === 'user' ?
                                <span className='text-[8pt] md:text-[10pt] break-words whitespace-normal'>{chat.message}</span>
                                :
                                <span dangerouslySetInnerHTML={getMarkdownText(chat.message)} className="text-[8pt] md:text-[10pt]" />
                            }
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
                {
                  isTyping ?
                    (
                      <div className='flex py-10'>
                        <div className='flex w-full justify-center items-center gap-3'>
                          <span className='text-gray-500/90'>Generating response</span>
                          <CircularProgress
                            size={15}
                            sx={{
                              "& .MuiCircularProgress-circle": {
                                "color": "gray",
                              },
                            }} />
                        </div>
                      </div>
                    ) : null
                }
              </div>
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