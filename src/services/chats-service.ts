import { CreateChatDto } from "@/dtos/chat/create-chat-dto";
import { ChatEntity } from "@/entities/chat/chat-entity";

export default class ChatsServices {
  private readonly baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  async getChats(userId: string): Promise<ChatEntity[] | null> {
    try {
      const response = await fetch(`${this.baseUrl}/chats/user/${userId}`);
      const data = await response.json();
      return data as ChatEntity[];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createChat(chat: CreateChatDto): Promise<ChatEntity | null> {
    try {
      const response = await fetch(`${this.baseUrl}/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chat),
      });
      const data = await response.json();
      return data as ChatEntity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async renameChat(chatId: string, newName: string): Promise<ChatEntity | null> {
    try {
      const response = await fetch(`${this.baseUrl}/chats/${chatId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });
      const data = await response.json();
      return data as ChatEntity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getChatById(chatId: string): Promise<ChatEntity | null> {
    try {
      const response = await fetch(`${this.baseUrl}/chats/${chatId}`);
      const data = await response.json();
      return data as ChatEntity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteChat(chatId: string): Promise<void | null> {
    try {
      const response = await fetch(`${this.baseUrl}/chats/${chatId}`, {
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
