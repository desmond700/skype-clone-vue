<template>
  <top-bar />
  <message-view />
  <message-input />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TopBar from "@/components/chat-view/TopBar.vue";
import MessageView from "@/components/chat-view/message-view/MessageView.vue";
import MessageInput from "@/components/chat-view/MessageInput.vue";

export default defineComponent({
  name: "ChatView",
  components: {
    TopBar,
    MessageView,
    MessageInput
  }
});
</script>
<style lang="scss" scoped></style>
