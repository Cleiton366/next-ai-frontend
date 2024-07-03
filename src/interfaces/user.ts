import { Chat } from "./chat";
import Preferences from "./preferences";

export default interface User {
  id: string,
  name: string,
  email: string,
  profilePicture: string,
  chats: Chat[] | [],
  preferences: Preferences
}