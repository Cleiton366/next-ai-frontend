import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LuPencil } from "react-icons/lu";
import { Input } from "./ui/input";
import { use, useEffect, useState } from "react";

export function RenameChatDialog({
  tittle,
  description,
}: {
  tittle: string,
  description: string,
}) {
  const [newChatName, setNewChatName] = useState<string>('');

  function handleNewChatName() {
    console.log(newChatName);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className='w-full flex justify-between items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
          <span>Rename</span>
          <LuPencil />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent 
        className="bg-zinc-900/95"
        onClick={(e) => e.stopPropagation()} 
        onKeyDown={(e) => e.stopPropagation()} 
        onPointerMove={(e) => e.stopPropagation()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{tittle}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
          <div>
            <Input 
              type="text" 
              className="w-full md:max-w-[40rem] bg-accent p-5 border-white/15" 
              onChange={(e) => setNewChatName(e.target.value)}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-secondary hover:text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-accent" onClick={() => handleNewChatName()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
