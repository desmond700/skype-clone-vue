export interface ChatModuleState {
  chatMessages: GroupMessage;
  messageToClient: Message;
  roomType: boolean;
  currentRecipient: string;
  directChatRecipient: User;
  channelDrafts: Array<ChannelDraft>;
  directChatPartnerDrafts: Array<DirectChatPartnerDraft>;
  latestChannelMessages: Map<string, LatestChannelMessage>;
  latestDirectMessages: Map<string, LatestDirectMessage>;
  imageAttachment: ImageAttachment;
  localStream: MediaStream;
}

export interface ToggleSwitch {
  takeAPhoto: string;
  uploadImage: string;
}

export interface Group {
  _id: string;
  name: string;
  members: User[];
  unreadMessageCount: number;
}

export interface CallOffer {
  from: User;
  target: User;
  type: string;
  sdp: RTCSessionDescription | null | undefined;
  roomId: string;
}

export interface Channel {
  _id: string;
  name: string;
  workspace: string;
  users: number;
  unreadMessageCount: number;
}

export interface ChannelDraft {
  name: string;
  messageTxt: string;
  attachment: FileAttachment[];
}

export interface DirectChatPartnerDraft {
  isDraft: boolean;
  _id: string;
  messageTxt: string;
  attachment: FileAttachment[];
}

export interface UnreadMessage {
  channels: Array<Message>;
  directMessages: Array<Message>;
}

export interface LatestChannelMessage {
  sender: string;
  timestamp: number;
}

export interface LatestDirectMessage {
  sender: string;
  timestamp: number;
}

export interface ActiveRoom {
  workspace: string;
  isPrivate: boolean | null;
  id: string;
}

export interface User {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  imgUrl: string | null;
  isOnline: boolean;
  isAuthenticated: boolean | null;
  joinedWorkspace: boolean;
  socket: string;
  status: string;
  unreadMessageCount: number;
  lastActiveWorkspace: Workspace;
}

export function instanceOfUser(object: any): object is User {
  return "username" in object;
}

export interface FileAttachment {
  name: string;
  data: string;
  mimeType: string;
}

export interface ImageAttachment {
  attachments: FileAttachment[];
  sender: User;
  createdAt: string;
}


export interface Message {
  _id: string;
  text: string;
  unread: boolean;
  attachments: FileAttachment[];
  private: boolean;
  channel: string | null;
  reply: Message | null;
  sender: User;
  receiver: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  _id: string;
  name: string;
  members: Array<User>;
  channels: Array<Channel>;
}

export interface ChannelVisitLog {
  id: string;
  lastVisited: string;
}

export interface MemberVisitLog {
  id: string;
  lastVisited: string;
}

export interface WorkspaceVisitLog {
  name: string;
  channels: Array<Channel>;
  members: Array<User>;
}

export const WORKSPACE_NORMALISED: Workspace = {
  _id: "",
  name: "",
  members: [],
  channels: []
};

export const FILE_ATTACHMENT_NORMALISED: FileAttachment = {
  name: "",
  data: "",
  mimeType: ""
};

export const USER_NORMALISED: User = {
  _id: "",
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  imgUrl: null,
  isOnline: false,
  isAuthenticated: null,
  joinedWorkspace: false,
  socket: "",
  status: "",
  unreadMessageCount: 0,
  lastActiveWorkspace: WORKSPACE_NORMALISED
};

export const MESSAGE_NORMALISED: Message = {
  _id: "",
  text: "",
  unread: false,
  attachments: [],
  private: false,
  channel: null,
  reply: null,
  sender: USER_NORMALISED,
  receiver: null,
  createdAt: "",
  updatedAt: ""
};

export const CHANNEL_NORMALIZED: Channel = {
  _id: "",
  name: "",
  workspace: "",
  users: 0,
  unreadMessageCount: 0
};

export const UNREAD_MESSAGE_NORMALISED: UnreadMessage = {
  channels: [],
  directMessages: []
};

export const ACTIVE_ROOM_NORMALISED: ActiveRoom = {
  workspace: "",
  isPrivate: null,
  id: ""
};

export type GroupContact = { [path: string]: Array<User> };
export type GroupMessage = { [path: string]: Array<Message> };

export const GROUP_MESSAGE_NORMALISED: GroupMessage = {};

export const GROUP_CONTACT_NORMALISED: GroupMessage = {};
export const IMAGE_ATTACHMENT_NORMALISED: ImageAttachment = {
  attachments: [],
  sender: USER_NORMALISED,
  createdAt: ""
}