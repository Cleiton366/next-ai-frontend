import Message from "./message";

interface Chat {
  id: string,
  name: string,
  userId: string,
  messages: Message[]
  createdAt: string,
  isArchived: boolean,
}

export type { Chat };