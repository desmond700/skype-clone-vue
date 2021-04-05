<template>
  <div class="navigation-item-action-container">
    <button class="btn">
      <VideoOutline class="icon" />
      <span class="text">Meet Now</span>
      <ChevronDown class="icon" />
    </button>
    <button class="btn">
      <SquareEditOutline class="icon" />
      <span class="text">New Chat</span>
      <ChevronDown class="icon" />
    </button>
  </div>
  <div class="navigation-item-header-container">
    <button class="btn header-btn">
      <span class="text">RECENT CHATS</span>
      <ChevronDown class="icon" />
    </button>
  </div>
  <div class="scroll-container">
    <ChatItem v-for="(user, index) in users" :key="index" :user="user" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  ChevronDown,
  PhonePlusOutline,
  VideoOutline,
  SquareEditOutline
} from "mdue";
import ChatItem from "@/components/ChatItem.vue";

export default defineComponent({
  name: "Chats",
  components: {
    ChevronDown,
    VideoOutline,
    SquareEditOutline,
    ChatItem
  },
  data: () => ({
    users: [
      {
        username: "desmond",
        firstname: "Desmond",
        lastname: "Wallace",
        imgUrl: null
      },
      {
        username: "johndoe",
        firstname: "John",
        lastname: "Doe",
        imgUrl: null
      },
      {
        username: "pam123",
        firstname: "Pam",
        lastname: "Reid",
        imgUrl: null
      },
      {
        username: "joe324",
        firstname: "Joe",
        lastname: "Ingrid",
        imgUrl: null
      },
      {
        username: "richard6574",
        firstname: "Richard",
        lastname: "Elliot",
        imgUrl: null
      }
    ]
  })
});
</script>
<style lang="scss" scoped>

</style>
