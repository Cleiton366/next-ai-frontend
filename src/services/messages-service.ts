import { CreateMessageDto } from "@/dtos/message/create-message-dto";
import Message from "@/entities/message/message-entity";

export default class MessagesService {
  private readonly baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  async postMessage(message: CreateMessageDto): Promise<Message | null> {
    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      const data = await response.json();
      return data as Message;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
