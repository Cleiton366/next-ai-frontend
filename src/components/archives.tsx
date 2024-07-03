import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PiArchiveDuotone } from "react-icons/pi";
import { chats } from '../data'
import { Separator } from "./ui/separator";
import { BiArchiveOut } from "react-icons/bi";
import { LuTrash2 } from "react-icons/lu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function Archives({
  type
}: {
  type: 'dropdown-item' | 'button'
}) {

  function setDialogTrigger() {
    return type === 'dropdown-item' ?
      (
        <div className='w-full flex justify-between items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
          <span>Archived Chats</span>
          <PiArchiveDuotone />
        </div>
      ) :
      (
        <Button className="bg-accent border-[0.1rem] border-white/15">View Archived</Button>
      );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {setDialogTrigger()}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[525px] h-[520px] bg-primary"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onPointerMove={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Archieves</DialogTitle>
        </DialogHeader>
        <Separator className="mt-4" />
        <div className="flex justify-between items-center py-2 px-1">
          <span className="text-white font-semibold">Archived Chats</span>
          <span className="text-white font-semibold">Date created</span>
          <span className="text-white font-semibold">Actions</span>
        </div>
        <div className="overflow-scroll">
          <div className="flex flex-col pb-5 pt-2 space-y-3">
            {
              chats.map((chat, i) => (
                <div key={i} className="flex justify-between items-center px-1">
                  <span className="text-white overflow-hidden text-ellipsis max-w-40">{chat.name}</span>
                  <span className="pr-8">July 1, 2222</span>
                  <div className="flex gap-5">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button className='p-0 h-fit'>
                            <BiArchiveOut className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger >
                        <TooltipContent className='bg-secondary text-white'>
                          <p>Unarchive chat</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button className='p-0 h-fit'>
                            <LuTrash2 className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger >
                        <TooltipContent className='bg-secondary text-white'>
                          <p>Delete chat</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
