"use server";

import { prisma } from "@repo/database";
import { recieverId } from "./id";

export const getCurrentUser = async ({ usermail }: { usermail: string }) => {
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        email: usermail,
      },
    });

    return getUser;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const createChat = async ({
  senderId,
  body,
}: {
  senderId: string;
  body: string;
}) => {
  try {
    let getConversations = await prisma.conversation.findFirst({
      where: {
        participantsIds: {
          hasEvery: [senderId, recieverId],
        },
      },
    });
    if (!getConversations) {
      getConversations = await prisma.conversation.create({
        data: {
          participantsIds: {
            set: [senderId, recieverId],
          },
        },
      });
    }
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body,
        conversationId: getConversations.id,
      },
    });
    if (newMessage) {
      getConversations = await prisma.conversation.update({
        where: {
          id: getConversations.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    return {
      message: "message created",
      newMessage,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMessages = async ({ senderId }: { senderId: string }) => {
  try {
    const getMessages = await prisma.conversation.findFirst({
      include: {
        messages: true,
      },
      where: {
        participantsIds: {
          hasEvery: [senderId, recieverId],
        },
      },
    });
    if (!getMessages) {
      return {
        message: "no messages",
        getMessages: [],
      };
    }

    return {
      message: "all messages",
      getMessages,
    };
  } catch (err: any) {
    throw new Error(err);
  }
};
