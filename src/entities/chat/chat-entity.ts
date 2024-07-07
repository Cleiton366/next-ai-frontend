import MessageEntity from "../message/message-entity";

export class ChatEntity {
  id!: string;

  name!: string;

  userId!: string;

  createdAt!: Date;

  isArchived!: boolean;

  messages!: MessageEntity[];
}