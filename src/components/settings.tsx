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
import { ChatEntity } from "@/entities/chat/chat-entity"
import { Dispatch, SetStateAction, use, useEffect, useState } from "react"
import { useUser } from "@/contexts/user-context"
import useToast from "@/util/use-toast"
import ArchivesService from "@/services/archives-service"
import ChatsServices from "@/services/chats-service"
import { useRouter } from "next/navigation"

export function Settings() {
  const archivesServices = new ArchivesService();
  const chatsServices = new ChatsServices();
  const { user, clearUser, setArchives, chats, setChats, archives } = useUser();
  const router = useRouter();

  useEffect(() => {
    getArchivesChat();
  }, []);

  useEffect(() => {
    getArchivesChat();
  }, [chats]);

  async function getArchivesChat() {
    try {
      const chats = await archivesServices.getArchivesChat(user!.id);
      if (!chats) {
        useToast('Error', 'Failed to get archived chats');
        return;
      } else {
        setArchives(chats);
      }
    } catch (error) {
      useToast('Error', 'Failed to get archived chats');
    }
  }

  async function handleDeleteAllChats() {
    try {
      await chatsServices.deleteAllChats(user!.id);
      setChats([]);
      useToast('Success', 'Chats deleted successfully');
    } catch (error) {
      useToast('Error', 'Failed to delete chats');
    }
  }

  async function handleArchiveAllChats() {
    try {
      await archivesServices.archiveAllChats(user!.id);
      setArchives([...archives, ...chats]);
      setChats([]);
      useToast('Success', 'Chats archived successfully');
    } catch (error) {
      useToast('Error', 'Failed to archive chats');
    }
  }

  async function handleDeleteArchivedChats() {
    try {
      await archivesServices.deleteAllArchivedChats(user!.id);
      setArchives([]);
      useToast('Success', 'Archived chats deleted successfully');
    } catch (error) {
      useToast('Error', 'Failed to delete archived chats');
    }
  }

  async function handleDeleteAccount() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user!.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      clearUser();
      router.push('/');
    } catch (error) {
      useToast('Error', 'Failed to delete account');
    }
  }

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
                action={() => handleArchiveAllChats()}
                disabled={chats.length === 0}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <Separator />
            <h3 className="text-white">Danger Zone</h3>
            <div className="flex justify-between items-center">
              <DialogDescription className="max-w-44 text-red-600 font-semibold">Delete archiveds chats</DialogDescription>
              <DAlertDialog
                tittle="Delete Archieved Chats"
                description="Are you sure you want to delete all archived chats?"
                buttonName="Delete All"
                variant="danger"
                action={() => handleDeleteArchivedChats()}
                disabled={archives.length === 0}
              />
            </div>
            <div className="flex justify-between items-center">
              <DialogDescription className="max-w-44 text-red-600 font-semibold">Delete all chats</DialogDescription>
              <DAlertDialog
                tittle="Delete Chats"
                description="Are you sure you want to delete all chats?"
                buttonName="Delete All"
                variant="danger"
                action={() => handleDeleteAllChats()}
                disabled={chats.length === 0}
              />
            </div>
            <div className="flex justify-between items-center">
              <DialogDescription className="max-w-44 text-red-600 font-semibold">Delete account and erase all data</DialogDescription>
              <DAlertDialog
                tittle="Delete Account"
                description="Are you sure you want to delete your account and all data? This action is irreversible."
                buttonName="Delete Account"
                variant="danger"
                action={() => handleDeleteAccount()}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
