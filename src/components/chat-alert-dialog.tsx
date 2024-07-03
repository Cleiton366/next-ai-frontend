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
import { Button } from "@/components/ui/button"
import { LuTrash2 } from "react-icons/lu";
import { PiArchiveDuotone } from "react-icons/pi";

export function ChatAlertDialog({
  tittle,
  description,
  type,
  action,
}: {
  tittle: string,
  description: string,
  type: 'archive' | 'delete',
  action: () => void
}) {

  function setDialogTrigger() {
    return type === 'archive' ?
      (
        <div className='w-full flex justify-between items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
          <span>Archive</span>
          <PiArchiveDuotone />
        </div>
      ) :
      (
        <div className='w-full flex justify-between items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
          <span>Delete</span>
          <LuTrash2 />
        </div>
      );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {setDialogTrigger()}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-zinc-900/95">
        <AlertDialogHeader>
          <AlertDialogTitle>{tittle}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-secondary hover:text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-accent" onClick={() => action()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
