import Message from "./message";

export default interface Chat {
  id: string,
  name: string,
  userId: string,
  messages: Message[]
  createdAt: string
}