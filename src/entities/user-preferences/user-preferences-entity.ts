import { ProviderEntity } from "../provider/provider-entity";

export class UserPreferencesEntity {
  id!: string;

  userId!: string;

  defaultSource!: string;

  defaultProvider!: string;

  defaultModel!: string;

  apiKeys!: ProviderEntity[];
}
