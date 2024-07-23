import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import UserPreferencesServices from "@/services/user-preferences";
import ProvidersService from "@/services/providers-service";
import { useUser } from "@/contexts/user-context";
import { Model } from "@/entities/provider/models-entity";
import { UpdateUsersPreferenceDto } from "@/dtos/user-preferences/update-user-preferences-dto";

export default function ModelsDropDownMenu() {
  const userPreferencesServices = new UserPreferencesServices();
  const providersServices = new ProvidersService();
  const { user, setUser, getUser, models, setModels, defaultModel, setDefaultModel, setDefaultProvider, defaultProvider } = useUser();

  useEffect(() => {
    if (user) {
      const getData = async () => {
        try {
          const providersModels = await providersServices.getProvidersModels();
          if (providersModels) {
            const userProvider = user!.preferences.defaultProvider;
            const provider = providersModels!.find((provider) => provider.id === userProvider);

            setModels(provider!.models);
            setDefaultModel(user!.preferences.defaultModel);
            setDefaultProvider(user!.preferences.defaultProvider);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getData();
    }
  }, [user]);

  async function handleModelChange(model: string) {
    setDefaultModel(model);
    const updatePreferences: UpdateUsersPreferenceDto = {
      defaultModel: model,
      defaultProvider: defaultProvider
    }
    try {
      await userPreferencesServices.updatePreferences(user!.preferences.id, updatePreferences);
      const updatedUser = await getUser();
      setUser(updatedUser);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='bg-primary border-[0.1rem] border-white/15'>{`Model: ${defaultModel}`}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-secondary text-white">
        <DropdownMenuLabel>Select a model</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={defaultModel} onValueChange={(value) => handleModelChange(value)}>
          {
            models.map((model) => (
              <DropdownMenuRadioItem
                value={model.id}
                className='w-full flex pl-10 items-center justify-center text-white p-2 px-3 rounded-sm cursor-pointer focus:bg-white focus:text-black'
                key={model.id}
              >
                {model.name}
              </DropdownMenuRadioItem>
            ))
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}