import { UserEntity } from "@/entities/user/user-entity";

export default class UserService {
  private readonly baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  async getUser(id: string): Promise<UserEntity | null> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data as UserEntity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
