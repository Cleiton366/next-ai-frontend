
interface model {
  id: string;
  name: string;
}

export class ProvidersListEntity {
  id!: string;

  name!: string;

  url!: string;

  documentationUrl!: string;

  models!: model[];
}