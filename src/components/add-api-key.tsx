import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { ProvidersModelsEntity } from "@/entities/provider/providers-models-entity";
import ProvidersService from "@/services/providers-service";
import { useUser } from "@/contexts/user-context";
import useToast from "@/util/use-toast";

export default function AddApiKey({
  setIsAdding,
}: {
  setIsAdding: Dispatch<SetStateAction<boolean>>,
}) {
  const { user, APIs, setAPIs } = useUser();
  const [provider, setProvider] = useState('');
  const [apiKey, setApiKey] = useState('');
  const providersServices = new ProvidersService();
  const [providers, setProviders] = useState<ProvidersModelsEntity[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const providersModels = await providersServices.getProvidersModels();
        if (providersModels) {
          const filteredProviders = filterProviders(providersModels);

          setProviders(filteredProviders)
          setProvider(filteredProviders[0].name);
        };
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  function filterProviders(unfilteredProviders: ProvidersModelsEntity[]): ProvidersModelsEntity[] {
    const filteredProviders: ProvidersModelsEntity[] = []
    const auxProviders: ProvidersModelsEntity[] = unfilteredProviders;
    for (var i = 0; i < auxProviders.length; i++) {
      for (var j = 0; j < APIs.length; j++) {
        if (auxProviders[i].name === APIs[j].name) {
          filteredProviders.push(auxProviders[i]);
        }
      }
    }

    for (var i = 0; i < filteredProviders.length; i++) {
      for (var j = 0; j < auxProviders.length; j++) {
        if (filteredProviders[i].name === auxProviders[j].name) {
          auxProviders.splice(j, 1);
        }
      }
    }

    return auxProviders;
  }

  async function handleAddAPIKey() {
    try {
      await providersServices.createProvider({
        key: apiKey,
        preferencesId: user!.preferences.id,
        name: provider
      });
      const newAPIs = await providersServices.getProviders(user!.preferences.id);
      setAPIs(newAPIs!);
      useToast('success', 'API Key added successfully');
      setIsAdding(false);
    } catch (error) {
      console.log(error);
      useToast('error', 'Failed to add API Key');
    }
  }

  return (
    <div className="flex flex-col justify-between gap-2">
      <div className="flex gap-2">
        <Input
          className="w-full bg-accent p-2 px-5 border-white/15"
          placeholder="Enter new API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-primary border-[0.1rem] border-white/15 min-w-44" variant="outline">Provider: {provider}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-secondary text-white">
            <DropdownMenuLabel>Select a Provider</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={provider} onValueChange={setProvider}>
              {
                providers.map((provider) => (
                  <DropdownMenuRadioItem key={provider.id} className="w-full flex pl-10 items-center justify-center text-white p-2 px-3 rounded-sm cursor-pointer focus:bg-white focus:text-black" value={provider.name}>{provider.name}</DropdownMenuRadioItem>
                ))
              }
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-2 justify-end mt-2">
        <Button
          className="bg-accent border-[0.1rem] border-white/15"
          disabled={apiKey.length === 0}
          onClick={handleAddAPIKey}
        >
          Save
        </Button>
        <Button
          className="bg-accent border-[0.1rem] border-white/15"
          onClick={() => setIsAdding(false)}
        >Cancel</Button>
      </div>
    </div>
  )
}