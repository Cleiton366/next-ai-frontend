import { Dispatch, SetStateAction, use, useState } from "react";
import { DialogDescription } from "./ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Input } from "./ui/input";
import { ProviderEntity } from "@/entities/provider/provider-entity";
import ProvidersService from "@/services/providers-service";
import useToast from "@/util/use-toast";
import { useUser } from "@/contexts/user-context";

export default function UserApiKeyContainer({ API }: { API: ProviderEntity }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [newKey, setNewKey] = useState('');
  const providersServices = new ProvidersService();
  const { setAPIs } = useUser();

  async function handleDeleteAPIKey() {
    try {
      await providersServices.deleteProvider(API.id);
      const newAPIs = await providersServices.getProviders(API.preferencesId);
      setAPIs(newAPIs!);
      useToast('success', 'API Key deleted successfully');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditAPIKey() {
    try {
      await providersServices.updateProvider(API.id, { key: newKey });
      const newAPIs = await providersServices.getProviders(API.preferencesId);
      setAPIs(newAPIs!);
      setNewKey('');
      setIsEditing(false);
      useToast('success', 'API Key updated successfully');
    } catch (error) {
      console.log(error);
    }
  }

  const manageKey = () => {
    return (
      <div className="flex justify-between px-5">
        {
          isKeyVisible ?
            (
              <div className="flex-grow max-w-80 overflow-hidden">
                <span>{API.key}</span>
              </div>
            ) :
            (
              <span>***************************</span>
            )
        }
        <div className="flex gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='p-0 h-fit'
                  onClick={() => setIsKeyVisible(!isKeyVisible)}
                >
                  {
                    isKeyVisible ?
                      (
                        <LuEyeOff className="h-6 w-6" />
                      ) :
                      (
                        <LuEye className="h-6 w-6" />
                      )
                  }
                </Button>
              </TooltipTrigger >
              <TooltipContent className='bg-secondary text-white'>
                <p>View Key</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className='p-0 h-fit' onClick={() => setIsEditing(!isEditing)}>
                  <LuPencil className="h-5 w-5" />
                </Button>
              </TooltipTrigger >
              <TooltipContent className='bg-secondary text-white'>
                <p>Edit Key</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className='p-0 h-fit' onClick={handleDeleteAPIKey}>
                  <LuTrash2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger >
              <TooltipContent className='bg-secondary text-white'>
                <p>Delete Key</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    )
  }

  const editKey = () => {
    return (
      <div className="flex justify-between gap-2">
        <Input
          className="w-full bg-accent p-2 px-5 border-white/15"
          placeholder="Enter new API Key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <div className="flex gap-2">
          <Button className="bg-accent border-[0.1rem] border-white/15" onClick={handleEditAPIKey}>Save</Button>
          <Button
            className="bg-accent border-[0.1rem] border-white/15"
            onClick={() => setIsEditing(!isEditing)}
          >Cancel</Button>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col justify-start min-h-[60px]">
      <DialogDescription>{API.name}</DialogDescription>
      {
        isEditing ? editKey() : manageKey()
      }
    </div>
  )
}