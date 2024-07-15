import { UpdateUsersPreferenceDto } from "@/dtos/user-preferences/update-user-preferences-dto";
import { UserPreferencesEntity } from "@/entities/user-preferences/user-preferences-entity";

export default class UserPreferencesServices {
  private readonly baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  async updatePreferences(id: string, preferences: UpdateUsersPreferenceDto): Promise<UserPreferencesEntity | null> {
    try {
      const response = await fetch(`${this.baseUrl}/users-preferences/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });
      const data = await response.json();
      return data as UserPreferencesEntity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
