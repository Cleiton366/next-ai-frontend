import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function DropDownMenu() {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false);
  const [showPanel, setShowPanel] = useState<Checked>(false);

  return (
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
  )
}