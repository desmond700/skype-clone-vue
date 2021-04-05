import { Socket, io } from "socket.io-client";
import { ActiveRoom, CallOffer, Message, UnreadMessage, User } from "types";
import store from "@/store";
import { serverUrl } from "./network";

const cookieName = "user.sid";
const getCookie = (name: string) => {
  const rawCookie: string | undefined = document.cookie.match(name)?.input;
  if (rawCookie) {
    const cookieArray = rawCookie.split("=");
    return cookieArray[1];
  }

  return "";
};
const url = `${serverUrl}/`;
const socket: Socket = io(url, {
  secure: true,
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 9999,
  forceNew: true,
  query: { [cookieName]: getCookie(cookieName) },
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": url
  }
});

socket.on("connect", () => {
  console.log("connected to socket io");
});

socket.on("connect_error", error => {
  //socket.auth.token = "abcd";
  console.log("Socket.io connection error ", error);
  console.log("Socket ", socket);
  //socket.connect();
});

socket.on("error", error => {
  //socket.auth.token = "abcd";
  console.log("Socket.io error ", error);
  //socket.connect();
});

socket.on("disconnect", () => {
  console.log("disconnected from socket io");
});

socket.on("close", () => {
  console.log("Socket.io connection closed");
});

// Retrieve message made by current user
socket.on("messageToClients", (message: Message) => {
  console.log("messageToClients: ", message);

  const user = store.getters["user/currentUser"] as User;
  // This user is the person who sent the this message
  if (message.sender._id.toString() === user._id.toString()) {
    store.dispatch("chat/messageToClient", message);
  }
  // This message was sent by someone else
  else {
    const activeRoom = store.getters["user/activeRoom"] as ActiveRoom;
    // message is a direct message
    if (message.private) {
      // this user is in a private room
      if (activeRoom.isPrivate) {
        // this user is in private other than the one of the message's sender
        if (activeRoom.id.toString() !== message.sender._id.toString()) {
          // UNREAD MESSAGE
          //store.dispatch("workspace/setUnreadMessage", message);
        }
        // This user is in the same room as the message's sender
        else {
          store.dispatch("chat/messageToClient", message);
        }
      }
      // This user is in a channel
      else {
        console.log("activeRoom is a channel: ");
        // UNREAD MESSAGE
        store.dispatch("workspace/setUnreadMessage", message);
      }
    }
    // message is a channel message
    else {
      // This user is in a private room
      if (activeRoom.isPrivate) {
        // UNREAD MESSAGE
        //store.dispatch("workspace/setUnreadMessage", message);
      }
      // This user is in a channel
      else {
        // This user is in a channel other than that of the message
        if (activeRoom.id.toString() !== message.channel?.toString()) {
          // UNREAD MESSAGE
          //store.dispatch("workspace/setUnreadMessage", message);
        }
        // This user is in the same channel as that of the message
        else {
          store.dispatch("chat/messageToClient", message);
        }
      }
    }
  }
});

// Retrieve all contacts
socket.on("get-contacts", (contacts: Array<any>) => {
  console.log("contacts: ", contacts);
  store.dispatch("user/setContacts", contacts);
});

// Retrieve messages for the selected room
socket.on("roomMessages", (roomMessages: Array<any>) => {
  console.log("roomMessages: ", roomMessages);
  store.dispatch("chat/setChatMessages", roomMessages);
});

socket.on("updateRoomMembers", (clientsInRoom: number) => {
  //console.log("roomMembers: ", clientsInRoom);
  store.dispatch("workspace/setUsersInRoom", clientsInRoom);
});

socket.on("unread-messages", (workspaceUnreadMessages: Array<any>) => {
  if (workspaceUnreadMessages.length === 1) {
    const workspaceUnreadMsgs = workspaceUnreadMessages[0].workspace;
    const unreadMessages: UnreadMessage = {
      directMessages: workspaceUnreadMsgs.members,
      channels: workspaceUnreadMsgs.channels
    };
    store.dispatch("workspace/setUnreadMessages", unreadMessages);
  }
});

socket.on("user-online-status", (userInfo: any) => {
  //
  console.log("my user-online-status: ", userInfo);
  store.dispatch("workspace/setUserOnlineStatus", userInfo);
});

// video call events

// closeVideoCall();



const joinRoom = ({
  id,
  name,
  isPrivate
}: {
  id: string;
  name: string;
  isPrivate: boolean;
}) => {
  socket.emit("join-room", { id, name, isPrivate });
};

const joinNamespace = (categoryName: string) => {
  const categoryUrl = url + categoryName;
};

const sendMessageToServer = (messageObj: object) => {
  console.log("sendMessageToServer: ", socket);
  socket.emit("messageToServer", messageObj);
};

const sendIceCandidate = (event: any) => {
  socket.emit("ice-candidate", {
    roomId: "videochatroom",
    label: event.candidate.sdpMLineIndex,
    candidate: event.candidate.candidate
  });
};

const makeCallOffer = (offer: CallOffer) => {
  //
  console.log(offer.type, offer);
  socket.emit(offer.type, offer);
};

const answerCall = (offer: CallOffer) => {
  //
  socket.emit(offer.type, offer);
};

export const socketIO = {
  socket,
  joinNamespace,
  joinRoom,
  sendMessageToServer,
  makeCallOffer,
  answerCall,
  sendIceCandidate
};
