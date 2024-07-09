import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PiArchiveDuotone } from "react-icons/pi";
import { Separator } from "./ui/separator";
import { BiArchiveOut } from "react-icons/bi";
import { LuTrash2 } from "react-icons/lu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUser } from "@/contexts/user-context";
import useToast from "@/util/use-toast";
import ArchivesService from "@/services/archives-service";
import { ChatEntity } from "@/entities/chat/chat-entity";
import ChatsServices from "@/services/chats-service";

export function Archives({
  type,
  setChats,
  archives,
  setArchives
}: {
  type: 'dropdown-item' | 'button'
  setChats: Dispatch<SetStateAction<ChatEntity[]>>,
  archives: ChatEntity[],
  setArchives: Dispatch<SetStateAction<ChatEntity[]>>
}) {

  const archivesService = new ArchivesService();
  const chatsService = new ChatsServices();
  const { user } = useUser();

  useEffect(() => {
    getArchivesChat();
  }, []);

  async function getArchivesChat() {
    if (user) {
      try {
        const chats = await archivesService.getArchivesChat(user.id);
        if (chats) setArchives(chats);
      } catch (error) {
        useToast('Error', 'Failed to get archived chats');
        setArchives([]);
      }
    }
  }

  async function handleUnarchiveChat(chatId: string) {
    try {
      await archivesService.unarchiveChat(chatId);
      await getArchivesChat();
      await updateChat();
      useToast('Success', 'Chat unarchived');
    } catch (error) {
      useToast('Error', 'Failed to unarchive chat');
    }
  }

  async function handleDeleteChat(chatId: string) {
    try {
      await archivesService.deleteChat(chatId);
      await getArchivesChat();
      await updateChat();
      useToast('Success', 'Chat deleted');
    } catch (error) {
      useToast('Error', 'Failed to delete chat');
    }
  }

  async function updateChat() {
    const archives = await archivesService.getArchivesChat(user!.id);
    const chats = await chatsService.getChats(user!.id);
    if (!chats || !archives) {
      useToast('Error', 'Failed to update chat list');
      return;
    } else {
      setArchives(archives);
      setChats(chats);
    }
  }


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

  function formatDate(date: Date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {setDialogTrigger()}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[525px] h-[631px] bg-primary"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onPointerMove={(e) => e.stopPropagation()}
      >
        <div className="h-full">
          <DialogHeader>
            <DialogTitle className="mb-5">Archieves</DialogTitle>
          </DialogHeader>
          <Separator className="mt-4 mb-3" />
          <div className="flex justify-between items-center py-2 px-1">
            <span className="text-white font-semibold">Archived Chats</span>
            <span className="text-white font-semibold">Date created</span>
            <span className="text-white font-semibold">Actions</span>
          </div>
          {
            archives.length > 0 ? (
              <div className="overflow-scroll">
            <div className="flex flex-col h-full pb-5 pt-2 space-y-3">
              {
                archives.map((chat, i) => (
                  <div key={i} className="flex justify-between items-center px-1">
                    <span className="text-white overflow-hidden text-ellipsis w-28 h-12">{chat.name}</span>
                    <span className="">{formatDate(chat.createdAt)}</span>
                    <div className="flex gap-5">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className='p-0 h-fit'
                              onClick={() => handleUnarchiveChat(chat.id)}
                            >
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
                            <Button
                              className='p-0 h-fit'
                              onClick={() => handleDeleteChat(chat.id)}
                            >
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
            ) :
            (
              <div className="flex justify-center items-center h-full">
                <span className="text-white">No archived chats</span>
              </div>
            )
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}
