<template>
  <div id="topbar">
    <div id="left-container">
      <p id="name">
        {{ directChatRecipient.firstname }} {{ directChatRecipient.lastname }}
      </p>
      <div id="chat-items" v-show="false">
        <p id="message">{{ directChatRecipient.status }}</p>
        |
        <button class="btn gallery-btn">
          <AccountBoxMultipleOutline class="icon" /> Gallery
        </button>
        |
        <button class="btn find-btn"><Magnify class="icon" /> Find</button>
      </div>
    </div>
    <div id="right-container">
      <button class="btn" @click="startVideoCall">
        <VideoOutline class="icon" />
      </button>
      <button class="btn">
        <PhoneOutline class="icon" />
      </button>
      <button class="btn">
        <AccountPlusOutline class="icon" />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject, onMounted } from "vue";
import {
  VideoOutline,
  PhoneOutline,
  AccountBoxMultipleOutline,
  AccountPlusOutline,
  Magnify
} from "mdue";
import store from "@/store";
import { User } from "types";
import { CallHandlerType } from "@/helpers/CallHandler";

export default defineComponent({
  name: "TopBar",
  components: {
    VideoOutline,
    PhoneOutline,
    AccountPlusOutline,
    AccountBoxMultipleOutline,
    Magnify
  },
  setup() {
    // const currentUser = computed<User>(() => store.getters["user/currentUser"]);
    const directChatRecipient = computed<User>(
      () => store.getters["chat/directChatRecipient"]
    );
    const callHandler = inject<CallHandlerType>("callHandler");

    const startVideoCall = () => {
      store.dispatch("startVideoChat", {
        open: true,
        event: "START_VIDEO_CALL"
      });

      callHandler?.startVideoCall();
    };

    onMounted(() => {
      console.log("callHandler: ", callHandler);
    })

    return {
      startVideoCall,
      directChatRecipient
    };
  }
});
</script>
<style lang="scss" scoped>
#topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
  max-width: 100%;
  padding: 0 20px;
  box-shadow: 0 1px 4px -1px rgba($color: #000000, $alpha: 0.5);

  #left-container {
    display: flex;
    flex-direction: column;

    #name {
      height: fit-content;
      text-align: left;
      font-size: 1.3em;
      font-weight: 600;
      line-height: 1.1em;
    }

    #chat-items {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      #message {
        margin-right: 6px;
        font-size: 0.8em;
        font-weight: 600;
        color: gray;
      }

      .btn {
        padding: 0 6px;
        font-size: 0.8em;
        font-weight: 600;
        color: gray;

        .icon {
          font-size: 1.2em;
        }
      }
    }
  }

  #right-container {
    display: flex;
    justify-content: space-evenly;
    width: 130px;

    .btn {
      position: relative;
      height: 34px;
      width: 34px;
      background-color: #ececee;
      border-radius: 50%;

      &:hover {
        background-color: #cecece;
      }

      .icon {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        font-size: 1.2em;
        color: #383838;
        line-height: 0.4em;
      }
    }
  }
}
</style>
