import { useState } from 'react'
import { chats } from '../data'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Input } from './ui/input'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { FaGoogle } from "react-icons/fa";

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

export default function Chat() {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
  const [showPanel, setShowPanel] = useState<Checked>(false)

  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-between px-10 py-5 shadow-lg shadow-cyan-500/15'>
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
        <div>
          <Button className='bg-accent border-[0.1rem] border-white/15'>
            <FaGoogle className='h-5 w-5 mr-2' />
            Sign in with Google</Button>
        </div>
      </div>
      <div className="flex h-[45rem] overflow-x-scroll p-5 md:p-10 justify-center">
        <div className="flex flex-col w-full max-w-4xl">
          {
            chats[0].messages.map((chat, i: number) => (
              <div className='flex flex-col'>
                <div key={i} className={`my-2 ${setMessageStyle(chat.role)}`}>
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
      <div className='flex justify-center py-10 px-20'>
        <Input className='md:max-w-[40rem] bg-accent p-5 border-white/15' type="text" placeholder="Message with NextAI" />
      </div>
    </div>
  )
}