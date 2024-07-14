import { TbMessagePlus } from "react-icons/tb";
import { BiMenuAltRight } from "react-icons/bi";
import UserDropdownMenu from './user-dropdown-menu';
import ChatDropdownMenu from './chat-dropdown-menu';
import { ChatEntity } from '@/entities/chat/chat-entity';
import { useUser } from "@/contexts/user-context";

export default function ChatSideMenu({
  setChatSideMenu,
}: {
  setChatSideMenu: (value: boolean) => void,
}) {
  const { user, setCurrentChat, chats } = useUser();

  function handleSetCurrentChat(messages: ChatEntity) {
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
                  onClick={() => handleSetCurrentChat(chat)}
                >
                  <div className='w-40'>
                    <span className='text-[10pt] overflow-hidden'>{chat.name}</span>
                  </div>
                </div>
                <ChatDropdownMenu
                  chat={chat}
                />
              </div>
            )) :
            <div className='flex h-full justify-center items-center'>
              <p className='text-center text-white'>No chats yet</p>
            </div>
          }
        </div>
        {
          user ?
            <UserDropdownMenu type='medium' /> : null
        }
      </div>
      <div className='flex grow bg-black/80' />
    </div>
  )
}