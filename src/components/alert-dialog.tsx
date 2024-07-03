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

export function DAlertDialog({
  tittle,
  description,
  buttonName,
  action,
  variant
} :{
  tittle : string, 
  description : string, 
  buttonName : string,
  action : () => void
  variant : 'normal' | 'danger'
}) {

  function setButtonStyle () {
    return variant === 'normal' ? 'bg-accent border-[0.1rem] border-white/15' : 'bg-red-800/50 border-[0.1rem] border-white/15'
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={setButtonStyle()}>{buttonName}</Button>
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
