import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IoSettingsOutline } from "react-icons/io5"
import { Separator } from "./ui/separator"
import { DAlertDialog } from "./alert-dialog"
import { Archives } from "./archives"
import { UserPreferences } from "./user-preferences"

export function Settings() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='w-full flex justify-between items-center text-white p-2 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-black'>
          <span>Settings</span>
          <IoSettingsOutline />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-primary">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-10 py-4">
          <div className="grid gap-4">
            <Separator />
            <h3 className="text-white">User Preferences</h3>
            <div className="flex justify-between items-center">
              <DialogDescription className="max-w-44">Manage default models, providers and API keys</DialogDescription>
              <UserPreferences />
            </div>
            <Separator />
            <h3 className="text-white">Archieves</h3>
            <div className="flex justify-between items-center">
              <DialogDescription>View Archived Chats</DialogDescription>
              <Archives type="button" />
            </div>
            <div className="flex justify-between items-center">
              <DialogDescription>Archive all chats</DialogDescription>
              <DAlertDialog
                tittle="Archieve Chats"
                description="Are you sure you want to archive all chats?"
                buttonName="Archive All"
                variant="normal"
                action={() => console.log('Archieve all chats')}
              />
            </div>
            <div className="flex justify-between items-center">
              <DialogDescription>Delete archiveds chats</DialogDescription>
              <DAlertDialog
                tittle="Delete Archieved Chats"
                description="Are you sure you want to delete all archived chats?"
                buttonName="Delete All"
                variant="danger"
                action={() => console.log('Delete all archived chats')}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <Separator />
            <h3 className="text-white">Danger Zone</h3>
            <div className="flex justify-between items-center">
              <DialogDescription className="max-w-44 text-red-600 font-semibold">Delete all chats</DialogDescription>
              <DAlertDialog
                tittle="Delete Chats"
                description="Are you sure you want to delete all chats?"
                buttonName="Delete All"
                variant="danger"
                action={() => console.log('Delete all chats')}
              />
            </div>
            <div className="flex justify-between items-center">
              <DialogDescription className="max-w-44 text-red-600 font-semibold">Delete account and erase all data</DialogDescription>
              <DAlertDialog
                tittle="Delete Account"
                description="Are you sure you want to delete your account and all data? This action is irreversible."
                buttonName="Delete Account"
                variant="danger"
                action={() => console.log('Delete account')}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
