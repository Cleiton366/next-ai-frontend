import { ChatEntity } from "@/entities/chat/chat-entity";

export default class ArchivesService {
  private readonly baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  async getArchivesChat(userId: string): Promise<ChatEntity[] | null> {
    try {
      const response = await fetch(`${this.baseUrl}/archives/user/${userId}`);
      const data = await response.json();
      return data as ChatEntity[];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async archiveChat(chatId: string): Promise<void | null> {
    try {
      const response = await fetch(`${this.baseUrl}/archives/archive/${chatId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
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

  async unarchiveChat(chatId: string): Promise<void | null> {
    try {
      const response = await fetch(`${this.baseUrl}/archives/unarchive/${chatId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
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

  async archiveAllChats(userId: string): Promise<void | null> {
    try {
      const response = await fetch(`${this.baseUrl}/archives/archive-all/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }, 
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
