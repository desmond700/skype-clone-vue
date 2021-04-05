import { socketIO } from "@/config";
import store from "@/store";
import {
  LatestChannelMessage,
  LatestDirectMessage,
  Message,
  User
} from "../../types";

export function navigationGuardHandler(
  user: User,
  isAuthenticated: boolean,
  to: any,
  next: any
) {
  if (isAuthenticated) {
    console.log("isAuthenticated");
    // if (to.name !== "JoinWorkspace" && !user.joinedWorkspace) {
    //   next({ name: "JoinWorkspace", params: { id: user._id } });
    // } else if (to.name === "JoinWorkspace" && user.joinedWorkspace) {
    //   next(false);
    // } else {
    //   next();
    // }
    next();
  } else {
    next({ name: "Login" });
  }
}

export function compareDate(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export const localDateStringOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric"
};

export function groupByLetter(contacts: Array<User>) {
  const groupedContacts = contacts.reduce((acc: any, currentValue: User) => {
    const letterProperty = currentValue.firstname.charAt(0).toUpperCase();

    if (letterProperty in acc) {
      acc[letterProperty].push(currentValue);
    } else {
      acc[letterProperty] = [];
      acc[letterProperty].push(currentValue);
    }
    return acc;
  }, {});

  return groupedContacts;
}

export function groupByDate(messages: Array<Message>) {
  let propertyName: string;
  let activeDate: Date;
  const groupedMessages = messages.reduce((acc: any, currentValue: Message) => {
    const currentDate = new Date(currentValue.createdAt);

    if (activeDate && compareDate(currentDate, activeDate)) {
      acc[propertyName].push(currentValue);
    } else {
      propertyName = currentDate.toLocaleDateString(
        "en-EN",
        localDateStringOptions
      );
      activeDate = currentDate;
      acc[propertyName] = [];
      acc[propertyName].push(currentValue);
    }
    return acc;
  }, {});

  return groupedMessages;
}

export function messagePastTimeThreshold(timestamp: number): boolean {
  const fiveMin = 1000 * 60 * 5;
  return new Date().getTime() - timestamp > fiveMin;
}

export function lastDirectMessageHelper(
  user: User,
  latestDirectMessages: Map<string, LatestDirectMessage>,
  message: Message
) {
  function latestDirectMessage({
    sender
  }: {
    sender: string;
  }): LatestDirectMessage {
    return {
      sender,
      timestamp: new Date().getTime()
    };
  }

  function setLatestDirectMessage({
    directPartner,
    sender
  }: {
    directPartner: string;
    sender: string;
  }) {
    if (latestDirectMessages.size > 0) {
      const latestMessage = latestDirectMessages.get(directPartner);

      if (latestMessage) {
        latestDirectMessages.set(
          directPartner,
          latestDirectMessage({ sender })
        );
      } else {
        latestDirectMessages.set(
          directPartner,
          latestDirectMessage({ sender })
        );
      }
    } else {
      latestDirectMessages.set(directPartner, latestDirectMessage({ sender }));
    }
  }

  const currentUserIsNotSender =
    user._id.toString() !== message.sender._id.toString();

  if (currentUserIsNotSender) {
    const messageSender = message.sender._id.toString();
    setLatestDirectMessage({
      directPartner: messageSender,
      sender: messageSender
    });
  } else {
    const messageSender = message.sender._id.toString();
    const messageReceiver = message.receiver as string;
    setLatestDirectMessage({
      directPartner: messageReceiver,
      sender: messageSender
    });
  }
  console.log("latestDirectMessages: ", latestDirectMessages);
}

export function lastChannelMessageHelper(
  latestChannelMessages: Map<string, LatestChannelMessage>,
  message: Message
) {
  function latestChannelMessage({
    sender
  }: {
    sender: string;
  }): LatestChannelMessage {
    return {
      sender,
      timestamp: new Date().getTime()
    };
  }

  if (latestChannelMessages.size > 0) {
    const latestMessage = latestChannelMessages.get(message.channel as string);

    if (latestMessage) {
      latestChannelMessages.set(
        message.channel as string,
        latestChannelMessage({
          sender: message?.sender._id as string
        })
      );
    } else {
      latestChannelMessages.set(
        message.channel as string,
        latestChannelMessage({
          sender: message?.sender._id as string
        })
      );
    }
  } else {
    latestChannelMessages.set(
      message.channel as string,
      latestChannelMessage({
        sender: message?.sender._id as string
      })
    );
  }
  console.log("latestChannelMessages: ", latestChannelMessages);
}

export function channelMessageState(
  currentUserId: string,
  channelId: string
): boolean {
  console.log("channelMessageState currentUserId: ", currentUserId);
  const latestChannelMessages = store.getters[
    "chat/latestChannelMessages"
  ] as Map<string, LatestChannelMessage>;
  if (latestChannelMessages.size > 0) {
    const latestMessage = latestChannelMessages.get(channelId);
    if (latestMessage) {
      if (latestMessage.sender === currentUserId) {
        const messagePastThreshold = messagePastTimeThreshold(
          latestMessage.timestamp
        );
        if (messagePastThreshold) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
    return true;
  } else {
    return true;
  }
}

export function directMessageState(
  currentUserId: string,
  partnerId: string
): boolean {
  console.log("directMessageState currentUserId: ", currentUserId);
  const latestDirectMessages = store.getters[
    "chat/latestDirectMessages"
  ] as Map<string, LatestDirectMessage>;
  if (latestDirectMessages.size > 0) {
    const latestMessage = latestDirectMessages.get(partnerId);
    console.log("latestDirectMessage: ", latestMessage);
    if (latestMessage) {
      console.log(
        "latestMessage.sender: ",
        latestMessage.sender,
        " === currentUserId: ",
        currentUserId,
        ": ",
        latestMessage.sender === currentUserId
      );
      if (latestMessage.sender === currentUserId) {
        const messagePastThreshold = messagePastTimeThreshold(
          latestMessage.timestamp
        );
        console.log("messagePastThreshold: ", messagePastThreshold);
        if (messagePastThreshold) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
    return true;
  } else {
    return true;
  }
}

export function imageToBase64(src = "#", mimeType: string) {
  return new Promise((resolve: (value: string) => void, reject) => {
    const img = new Image();

    img.crossOrigin = "Anonymous";

    img.onload = function() {
      const canvas = document.createElement("CANVAS") as HTMLCanvasElement;
      const context = canvas.getContext("2d");
      let dataURL = "";

      canvas.width = img.width;
      canvas.height = img.height;
      context?.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL(mimeType);

      resolve(dataURL);
    };
    img.src = src;

    if (img.complete || img.complete === undefined) {
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
  });
}
