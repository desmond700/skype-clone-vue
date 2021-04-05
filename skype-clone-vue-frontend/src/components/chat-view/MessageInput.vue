<template>
  <div id="message-input">
    <div id="input-container">
      <EmoticonHappyOutline class="icon" />
      <input class="form-control" />
    </div>
    <button class="btn send-btn">
      <SendOutline class="icon" />
    </button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { EmoticonHappyOutline, SendOutline } from "mdue";
import store from "@/store";
import { FileAttachment, Group, User } from "types";
import { channelMessageState, directMessageState } from "@/helpers";
import { socketIO } from "@/config";

export default defineComponent({
  name: "MessageInput",
  components: {
    EmoticonHappyOutline,
    SendOutline
  },
  setup() {
    const messageText = ref("");
    const files = ref(Array<FileAttachment>());
    const isPrivate = computed<boolean>(() => store.getters["chat/roomType"]);
    const directChatPartner = computed<User>(
      () => store.getters["chat/currentDirectChatPartner"]
    );
    const currentGroup = computed<Group>(
      () => store.getters["chat/currentChannel"]
    );
    const currentUser = computed<User>(() => store.getters["user/currentUser"]);

    const isLeadMessage = (id: string): boolean => {
      if (isPrivate.value) {
        return directMessageState(currentUser.value._id.toString(), id);
      } else {
        return channelMessageState(currentUser.value._id.toString(), id);
      }
    };

    const sendMessage = () => {
      if (messageText.value !== "" || files.value.length > 0) {
        let message;
        if (isPrivate.value) {
          message = {
            private: isPrivate.value,
            isLead: isLeadMessage(directChatPartner.value._id.toString()),
            receiver: directChatPartner.value._id.toString(),
            attachments: files.value,
            text: messageText.value
          };
        } else {
          message = {
            private: isPrivate.value,
            isLead: isLeadMessage(currentGroup.value._id.toString()),
            group: {
              _id: currentGroup.value._id,
              name: currentGroup.value.name
            },
            attachments: files.value,
            text: messageText.value
          };
        }
        messageText.value = "";
        //messageInputText.value.value = "";
        files.value = [];
        console.log("message: ", message);
        socketIO.sendMessageToServer(message);
      }
    };

    return {
      messageText,
      sendMessage
    };
  }
});
</script>
<style lang="scss" scoped>
#message-input {
  display: flex;
  align-items: center;
  height: f;
  max-width: 100%;
  margin: 0 50px 20px 50px;

  #input-container {
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 40px;
    padding-left: 10px;
    background-color: #e6e6e9;
    border-radius: 20px;

    .icon {
      font-size: 1.6em;
      color: #3f3f3f;
    }

    input {
      height: 30px;
      border: none;
      background: none;
    }
  }

  .send-btn {
    display: flex;
    height: 40px;
    width: 40px;
    padding: 0;
    margin-left: 10px;
    background-color: rgb(39, 168, 207);
    border-radius: 50%;

    .icon {
      margin: auto;
      font-size: 1.2em;
      color: #fff;
    }
  }
}
</style>
