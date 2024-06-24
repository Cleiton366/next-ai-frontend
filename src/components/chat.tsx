import { Dispatch, SetStateAction, useState } from 'react'
import { chats } from '../data'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Input } from './ui/input'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { FaGoogle } from "react-icons/fa";
import { BiMenuAltLeft } from "react-icons/bi";
import { TbMessagePlus } from 'react-icons/tb'
import { LuArrowRightFromLine } from "react-icons/lu";

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

type Checked = DropdownMenuCheckboxItemProps["checked"]

function setMessageStyle(role: string) {
  return role === 'user' ? 'self-end' : 'self-start'
}

export default function Chat({
  setIsSideBarOpen,
  isSideBarOpen
}: {
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>,
  isSideBarOpen: boolean
}) {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
  const [showPanel, setShowPanel] = useState<Checked>(false)

  return (
    <div className='flex flex-col w-full'>
      <div className='bg-primary px-5 md:px-10 py-5 shadow-lg shadow-cyan-500/15 sticky top-0'>
        <div className='hidden md:block'>
          <div className='flex justify-between'>
            <div className='flex items-center'>
              {!isSideBarOpen ? <LuArrowRightFromLine className='h-6 w-6 mr-5 cursor-pointer' onClick={() => setIsSideBarOpen(!isSideBarOpen)}/> : null}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className='bg-primary border-[0.1rem] border-white/15'>Model: llama 3 8b</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-secondary text-white">
                  <DropdownMenuLabel>Select a model</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                    className='p-0'
                  >
                    <div className='w-full flex pl-10 items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
                      <span>GPT-3.5</span>
                    </div>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showActivityBar}
                    onCheckedChange={setShowActivityBar}
                    className='p-0'
                  >
                    <div className='w-full flex pl-10 items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
                      <span>GPT-3.5</span>
                    </div>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                    className='p-0'
                  >
                    <div className='w-full flex pl-10 items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
                      <span>GPT-3.5</span>
                    </div>
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Button className='bg-accent border-[0.1rem] border-white/15'>
                <FaGoogle className='md:h-5 md:w-5 mr-2' />
                <span className='text-[8pt] md:text[14pt]'>Sign in with Google</span>
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-between md:hidden'>
          <BiMenuAltLeft className='h-6 w-6 cursor-pointer' />
          <TbMessagePlus className='h-6 w-6 cursor-pointer' />
        </div>
      </div>
      <div className="flex md:h-[44rem] lg:h-[45rem] overflow-x-scroll scroll-smooth p-5 md:p-10 justify-center">
        <div className="flex flex-col w-full max-w-4xl">
          {
            chats[0].messages.map((chat, i: number) => (
              <div key={i} className='flex flex-col'>
                <div className={`my-2 ${setMessageStyle(chat.role)}`}>
                  <div className="max-w-[28rem]">
                    <div className={`p-2 rounded-lg ${chat.role === 'user' ? 'bg-secondary' : 'bg-accent'}`}>
                      <span className="text-[10pt]">{chat.message}</span>
                    </div>
                    <span className="text-[10pt] text-gray-500">{chat.timestamp}</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className='flex w-full justify-center bg-primary py-10 px-5 md:px-20 sticky bottom-0'>
        <Input className='w-full md:max-w-[40rem] bg-accent p-5 border-white/15' type="text" placeholder="Message with NextAI" />
      </div>
    </div>
  )
}