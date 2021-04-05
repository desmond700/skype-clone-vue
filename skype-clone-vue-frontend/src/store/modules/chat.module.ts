import {
  groupByDate,
  lastDirectMessageHelper,
  lastChannelMessageHelper
} from "@/helpers";
import {
  ChatModuleState,
  GROUP_MESSAGE_NORMALISED,
  MESSAGE_NORMALISED,
  ChannelDraft,
  DirectChatPartnerDraft,
  LatestChannelMessage,
  LatestDirectMessage,
  IMAGE_ATTACHMENT_NORMALISED,
  Message,
  User,
  ImageAttachment,
  GroupMessage,
  USER_NORMALISED
} from "../../../types";

export const chatModule = {
  namespaced: true,
  state: (): ChatModuleState => ({
    chatMessages: GROUP_MESSAGE_NORMALISED,
    messageToClient: MESSAGE_NORMALISED,
    roomType: false,
    currentRecipient: "",
    directChatRecipient: USER_NORMALISED,
    channelDrafts: Array<ChannelDraft>(),
    directChatPartnerDrafts: Array<DirectChatPartnerDraft>(),
    latestChannelMessages: new Map<string, LatestChannelMessage>(),
    latestDirectMessages: new Map<string, LatestDirectMessage>(),
    imageAttachment: IMAGE_ATTACHMENT_NORMALISED,
    localStream: {} as MediaStream
  }),
  mutations: {
    SET_CHAT_MESSAGES(state: ChatModuleState, messages: Array<Message>) {
      state.chatMessages = groupByDate(messages);
    },
    MESSAGE_TO_CLIENT(
      state: ChatModuleState,
      { user, message }: { user: User; message: Message }
    ) {
      state.messageToClient = message;
      console.log("message to client user: ", user);
      if (message.private) {
        lastDirectMessageHelper(user, state.latestDirectMessages, message);
      } else {
        lastChannelMessageHelper(state.latestChannelMessages, message);
      }
    },
    SET_ROOM_TYPE(state: ChatModuleState, type: boolean) {
      state.roomType = type;
    },
    SET_CURRENT_RECIPIENT(state: ChatModuleState, recipient: string) {
      state.currentRecipient = recipient;
    },
    SET_DIRECT_CHAT_RECIPIENT(state: ChatModuleState, directChatRecipient: User) {
      state.directChatRecipient = directChatRecipient;
    },
    SET_DIRECT_CHAT_PARTNER_DRAFT(
      state: ChatModuleState,
      directChatPartner: DirectChatPartnerDraft
    ) {
      state.directChatPartnerDrafts.push(directChatPartner);
    },
    SET_CHANNEL_DRAFT(state: ChatModuleState, channelDraft: ChannelDraft) {
      state.channelDrafts.push(channelDraft);
    },
    SET_IMAGE_ATTACHMENT(
      state: ChatModuleState,
      imageAttachment: ImageAttachment
    ) {
      state.imageAttachment = imageAttachment;
      console.log("imageAttachments: ", state.imageAttachment);
    },
    SET_LOCAL_MEDIA_STREAM(state: ChatModuleState, localStream: MediaStream) {
      state.localStream = localStream;
    }
  },
  actions: {
    setChatMessages(context: any, messages: Array<Message>) {
      context.commit("SET_CHAT_MESSAGES", messages);
    },
    messageToClient(context: any, message: Message) {
      const user = context.rootGetters["user/currentUser"] as User;
      context.commit("MESSAGE_TO_CLIENT", { user, message });
    },
    setRoomType(context: any, type: boolean) {
      context.commit("SET_ROOM_TYPE", type);
    },
    setCurrentRecipient(context: any, recipient: string) {
      context.commit("SET_CURRENT_RECIPIENT", recipient);
    },
    setdirectChatRecipient(context: any, directChatRecipient: User) {
      context.commit("SET_DIRECT_CHAT_RECIPIENT", directChatRecipient);
    },
    setDirectChatPartnerDraft(
      context: any,
      directChatPartnerDraft: DirectChatPartnerDraft
    ) {
      context.commit("SET_DIRECT_CHAT_PARTNER_DRAFT", directChatPartnerDraft);
    },
    setChannelDraft(context: any, channelDraft: DirectChatPartnerDraft) {
      context.commit("SET_CHANNEL_DRAFT", channelDraft);
    },
    setImageAttachment(context: any, imageAttachment: ImageAttachment) {
      context.commit("SET_IMAGE_ATTACHMENT", imageAttachment);
    },
    setLocalMediaStream(context: any, localStream: MediaStream) {
      context.commit("SET_LOCAL_MEDIA_STREAM", localStream);
    }
  },
  getters: {
    messageToClient(state: ChatModuleState) {
      return state.messageToClient;
    },
    chatMessages(state: ChatModuleState): GroupMessage {
      return state.chatMessages;
    },
    roomType(state: ChatModuleState): boolean {
      return state.roomType;
    },
    currentRecipient(state: ChatModuleState): string {
      return state.currentRecipient;
    },
    directChatRecipient(state: ChatModuleState): User {
      return state.directChatRecipient;
    },
    channelDrafts(state: ChatModuleState): Array<ChannelDraft> {
      return state.channelDrafts;
    },
    directChatPartnerDrafts(
      state: ChatModuleState
    ): Array<DirectChatPartnerDraft> {
      return state.directChatPartnerDrafts;
    },
    latestChannelMessages(
      state: ChatModuleState
    ): Map<string, LatestChannelMessage> {
      return state.latestChannelMessages;
    },
    latestDirectMessages(
      state: ChatModuleState
    ): Map<string, LatestDirectMessage> {
      return state.latestDirectMessages;
    },
    imageAttachment(state: ChatModuleState): ImageAttachment {
      return state.imageAttachment;
    },
    localMediaStream(state: ChatModuleState): MediaStream {
      return state.localStream;
    }
  }
};
