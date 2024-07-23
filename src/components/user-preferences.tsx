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
import { useEffect, useState } from "react";
import ModelsDropDownMenu from "./models-dropdown-menu";
import UserApiKeyContainer from "./user-api-key-container";
import { useUser } from "@/contexts/user-context";
import { IoMdAdd } from "react-icons/io";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ProvidersModelsEntity } from "@/entities/provider/providers-models-entity";
import ProvidersService from "@/services/providers-service";
import AddApiKey from "./add-api-key";
import useToast from "@/util/use-toast";
import UserPreferencesServices from "@/services/user-preferences";

export function UserPreferences() {
  const { user, setModels, setDefaultModel, defaultProvider, setDefaultProvider, APIs, setAPIs } = useUser();
  const [defaultSource, setDefaultSource] = useState(user!.preferences.defaultSource);
  const [providers, setProviders] = useState<ProvidersModelsEntity[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const providersServices = new ProvidersService();
  const userPreferencesServices = new UserPreferencesServices();

  useEffect(() => {
    const getData = async () => {
      try {
        const providersModels = await providersServices.getProvidersModels();
        const apis = await providersServices.getProviders(user!.preferences.id);

        if (apis) setAPIs(apis);
        if (providersModels) {
          setProviders(providersModels);
        };
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const providersModels = await providersServices.getProvidersModels();
      if (providersModels) {
        const filteredProviders = filterProviders(providersModels);
        setProviders(filteredProviders);
      }
    }
    if (defaultSource === 'api-key' && APIs.length > 0) {
      fetchData();
    }
  }, [APIs]);

  useEffect(() => {
    const getProviders = async () => {
      const providersModels = await providersServices.getProvidersModels();
      if (providersModels) setProviders(providersModels);
    }

    if (defaultSource === 'api-key') {
      const filteredProviders = filterProviders(providers);
      setProviders(filteredProviders);
    } else {
      getProviders();
    }
  }, [defaultSource]);

  function filterProviders(unfilteredProviders: ProvidersModelsEntity[]): ProvidersModelsEntity[] {
    const filteredProviders: ProvidersModelsEntity[] = []
    const auxProviders: ProvidersModelsEntity[] = unfilteredProviders;
    for (var i = 0; i < auxProviders.length; i++) {
      const provider = APIs.find((API) => API.name === auxProviders[i].name);
      if (provider) filteredProviders.push(auxProviders[i]);
    }

    return filteredProviders;
  }

  async function handleSetDefaultSource(value: string) {
    try {
      var provider;
      if (value === 'server') {
        provider = providers[0];
        setDefaultSource('server');
      } else {
        const firstAPI = APIs[0];
        provider = providers.find((provider) => provider.name === firstAPI.name);
        setDefaultSource('api-key');
      }

      await userPreferencesServices.updatePreferences(user!.preferences.id, {
        defaultModel: provider!.models[0].id,
        defaultProvider: provider!.id,
        defaultSource: value
      });
      setModels(provider!.models);
      setDefaultProvider(provider!.id);
      setDefaultModel(provider!.models[0].name);
      useToast('success', 'Default source set successfully');
    } catch (error) {
      useToast('error', 'Failed to set default source');
      setDefaultSource('server');
      console.log(error);
    }
  }

  async function handleSetDefaultProvider(value: string) {
    try {
      const provider = providers.find((provider) => provider.id === value);

      await userPreferencesServices.updatePreferences(user!.preferences.id, { defaultProvider: value, defaultModel: provider!.models[0].id });
      useToast('success', 'Default provider set successfully');
      setDefaultProvider(value);
      setModels(provider!.models);
      setDefaultModel(provider!.models[0].name);
    } catch (error) {
      useToast('error', 'Failed to set default provider');
      console.log(error);
    }
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
            <h3 className="text-white">Default Source</h3>
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col gap-3">
                <DialogDescription>
                  <span className="text-sm text-muted-foreground font-semibold">Server: </span>
                  Responses will use the server APIs key, extremely limited calls per day</DialogDescription>
                <DialogDescription>
                  <span className="text-sm text-muted-foreground font-semibold">User's api-key: </span>
                  Responses will use User's APIs key, calls per day may vary by service used
                </DialogDescription>
              </div>
              <div className="flex justify-between items-center w-full">
                <DialogDescription className="max-w-44">Set a default source</DialogDescription>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-primary border-[0.1rem] border-white/15" disabled={APIs.length === 0}>Source: {defaultSource}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-secondary text-white">
                    <DropdownMenuLabel>Default Source</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={defaultSource} onValueChange={(value) => handleSetDefaultSource(value)}>
                      <DropdownMenuRadioItem
                        value="server"
                        className='w-full flex pl-10 items-center justify-end text-white p-2 px-3 rounded-sm cursor-pointer focus:bg-white focus:text-black'
                      >
                        Server
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        value="api-key"
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
            <h3 className="text-white">Default Provider</h3>
            <div className="flex justify-between items-center">
              <DialogDescription>Set a default provider</DialogDescription>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-primary border-[0.1rem] border-white/15 min-w-44 hover:bg-primary hover:text-white" variant="outline">Provider: {defaultProvider}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-secondary text-white">
                  <DropdownMenuLabel>Select a Provider</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={defaultProvider} onValueChange={(value) => handleSetDefaultProvider(value)}>
                    {
                      providers.map((provider) => (
                        <DropdownMenuRadioItem key={provider.id} className="w-full flex pl-10 items-center justify-center text-white p-2 px-3 rounded-sm cursor-pointer focus:bg-white focus:text-black" value={provider.id}>{provider.name}</DropdownMenuRadioItem>
                      ))
                    }
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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
            <div className="flex justify-between items-center">
              <h3 className="text-white">User's API Keys</h3>
              {APIs && <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className='p-0 h-fit'
                      onClick={() => setIsAdding(true)}
                      disabled={APIs.length === 4}
                    >
                      <IoMdAdd size={20} />
                    </Button>
                  </TooltipTrigger >
                  <TooltipContent className='bg-secondary text-white mr-20'>
                    <p>Add api key</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>}
            </div>
            {
              isAdding &&
              <AddApiKey setIsAdding={setIsAdding} />
            }
            <div className="flex flex-col gap-5">
              {
                APIs && APIs.length > 0 ?
                  (APIs.map((API) => (
                    <UserApiKeyContainer key={API.id} API={API} />
                  ))) : (
                    <DialogDescription>No API Keys found</DialogDescription>
                  )
              }
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
