import { Prisma } from "@repo/database";

export type Message = Prisma.MessageSelect & {
  sender: User;
};
export type User = Prisma.UserSelect;

export type Conversation = Prisma.ConversationSelect & {
  messages: Message[];
};
