import { CreateProviderDto } from "@/dtos/provider/create-provider.dto";
import { UpdateProviderDto } from "@/dtos/provider/update-provider.dto";
import { ProviderEntity } from "@/entities/provider/provider-entity";
import { ProvidersModelsEntity } from "@/entities/provider/providers-models-entity";

export default class ProvidersService {
  private readonly baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  async getProviders(preferenceId : string): Promise<ProviderEntity[] | null> {
    try {
      const response = await fetch(`${this.baseUrl}/providers/preference/${preferenceId}`);
      const data = await response.json();
      return data as ProviderEntity[];
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  async getProvidersModels(): Promise<ProvidersModelsEntity[] | null> {
    try {
      const response = await fetch(`${this.baseUrl}/providers`);
      const data = await response.json();
      return data as ProvidersModelsEntity[];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createProvider(provider: CreateProviderDto): Promise<ProviderEntity | null> {
    try {
      const response = await fetch(`${this.baseUrl}/providers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(provider),
      });
      const data = await response.json();
      return data as ProviderEntity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateProvider(id: string, provider: UpdateProviderDto): Promise<ProviderEntity | null> {
    try {
      const response = await fetch(`${this.baseUrl}/providers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(provider),
      });
      const data = await response.json();
      return data as ProviderEntity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteProvider(id: string): Promise<void | null> {
    try {
      const response = await fetch(`${this.baseUrl}/providers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
}
