import { ChatEntity } from "../chat/chat-entity";
import { UserPreferencesEntity } from "../user-preferences/user-preferences-entity";

export class UserEntity {
  id!: string;

  name!: string;

  email!: string;

  profilePicture!: string;

  preferencesId!: string;

  chats!: ChatEntity[];

  preferences!: UserPreferencesEntity;
}