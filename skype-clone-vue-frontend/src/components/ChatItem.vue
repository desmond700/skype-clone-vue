<template>
  <router-link
    :to="{ name: 'Chat', params: { chat: user.username } }"
    class="chat-item-container"
  >
    <div class="user-img-container ">
      <img
        v-if="user.imgUrl"
        class="contact-img"
        src="http://voxpopulii.in/system/static/dashboard/img/default_user.png"
      />
      <span v-else class="initials">{{ userInitials }}</span>
      <div class="indicator"></div>
    </div>
    <div class="chat-item-info-container">
      <div class="chat-item-info-left">
        <p class="username">{{ user.firstname }} {{ user.lastname }}</p>
        <p class="text">sfcwefasdcavavdsvdssdwesfwefewewf</p>
      </div>
      <div class="chat-item-info-right">
        <p class="date">12:00 am</p>
        <div class="unread-message-count">
          <span class="text">2</span>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChatItemContainer",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    userInitials(): string {
      return this.user.firstname.charAt(0) + this.user.lastname.charAt(0);
    }
  }
});
</script>
<style lang="scss" scoped>
.chat-item-container {
  display: flex;
  align-items: center;
  height: fit-content;
  width: 100%;
  padding: 10px 6px;
  text-decoration: none;

  &:hover {
    background-color: #d5effc;

    .chat-item-img-container .indicator {
      border-color: #d5effc;
    }
  }

  .user-img-container {
    width: 35px;
    height: 35px;
  }

  .chat-item-info-container {
    display: flex;
    flex-grow: 1;
    max-width: calc(100% - 35px);
    padding: 0 0 0 8px;

    .chat-item-info-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-grow: 1;
      max-width: calc(100% - 50px);

      .username {
        text-align: left;
        font-size: 0.9em;
        color: #3b3b3b;
      }
      .text {
        height: fit-content;
        text-align: left;
        font-size: 0.8em;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #9c9fa3;
      }
    }

    .chat-item-info-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50px;

      .date {
        margin-left: auto;
        font-size: 0.7em;
        color: gray;
      }

      .unread-message-count {
        display: flex;
        height: 18px;
        width: fit-content;
        margin-left: auto;
        margin-top: auto;
        padding: 4px 6px;
        background-color: blue;
        border-radius: 9px;

        .text {
          margin: auto 0px;
          font-size: 0.7em;
          font-weight: 600;
          line-height: 1em;
          color: #fff;
        }
      }
    }
  }
}
</style>
