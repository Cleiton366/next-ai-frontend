import { Chat } from "./chat";

export default interface User {
  id: string,
  name: string,
  email: string,
  profilePicture: string,
  chats: Chat[] | []
}