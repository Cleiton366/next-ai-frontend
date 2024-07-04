import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "./ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useState } from "react";
import ModelsDropDownMenu from "./models-dropdown-menu";
import UserApiKeyContainer from "./user-api-key-container";
import Preferences from "@/interfaces/preferences";

export function UserPreferences() {
  const [defaultProvider, setDefaultProvider] = useState('server');
  const mockedPreferences: Preferences = {
    defaultProvider: 'server',
    defaultModel: 'gpt-3.5-turbo',
    apiKeys: [
      {
        name: 'OpenAI',
        key: 'f2dH*****************4123'
      },
      {
        name: 'Google',
        key: 'f2dH*****************4123'
      },
      {
        name: 'IBM',
        key: 'f2dH*****************4123'
      },
      {
        name: 'Microsoft',
        key: 'f2dH*****************4123'
      }
    ]
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-accent border-[0.1rem] border-white/15">Manage Preferences</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[525px] h-[631px] overflow-scroll bg-primary"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onPointerMove={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Preferences</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full gap-10 py-4">
          <div className="grid gap-4">
            <Separator />
            <h3 className="text-white">Default Provider</h3>
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col gap-3">
                <DialogDescription>
                  <span className="text-sm text-muted-foreground font-semibold">Server: </span>
                  Responses will use the server APIs key, extremely limited calls per day</DialogDescription>
                <DialogDescription>
                  <span className="text-sm text-muted-foreground font-semibold">User's Key: </span>
                  Responses will use User's APIs key, calls per day may vary by service used
                </DialogDescription>
              </div>
              <div className="flex justify-between items-center w-full">
                <DialogDescription className="max-w-44">Set a default provider</DialogDescription>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-primary border-[0.1rem] border-white/15">Provider</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-secondary text-white">
                    <DropdownMenuLabel>Default Provider</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={defaultProvider} onValueChange={setDefaultProvider}>
                      <DropdownMenuRadioItem
                        value="server"
                        className='w-full flex pl-10 items-center justify-end text-white p-2 px-3 rounded-sm cursor-pointer focus:bg-white focus:text-black'
                      >
                        Server
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        value="bottom"
                        className='w-full flex pl-10 items-center justify-end text-white p-2 px-3 rounded-sm cursor-pointer focus:bg-white focus:text-black'
                      >
                        User's Keys
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <Separator />
            <h3 className="text-white">Default Model</h3>
            <div className="flex justify-between items-center">
              <DialogDescription>Set a default model</DialogDescription>
              <ModelsDropDownMenu />
            </div>
          </div>
          <div className="grid gap-4">
            <Separator />
            <h3 className="text-white">User's API Keys</h3>
            <div className="flex flex-col gap-5">
              {
                mockedPreferences.apiKeys.map((provider) => (
                  <UserApiKeyContainer provider={provider} />
                ))
              }
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
