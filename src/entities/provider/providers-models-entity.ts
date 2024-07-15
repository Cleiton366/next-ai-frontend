import { Model } from "./models-entity";

export class ProvidersModelsEntity {
  id!: string;

  name!: string;

  url!: string;

  documentationUrl!: string;

  models!: Model[];
}