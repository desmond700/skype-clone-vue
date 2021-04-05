<template>
  <div
    id="video-call-topbar"
    :style="{
      height: remoteVideoCount >= 1 ? '110px' : '70px',
      position: remoteVideoCount <= 1 ? 'absolute' : 'static'
    }"
  >
    <div id="left-container">
      <button
        class="btn menu"
        :style="{ background: chatListVisible ? '#fff' : 'none' }"
        @click="showChatList"
      >
        <Menu
          class="icon"
          :style="{ color: chatListVisible ? '#000' : '#fff' }"
        />
      </button>
      <div class="column">
        <p id="call-name">Get together</p>
        <p id="duration">{{ duration }}</p>
      </div>
    </div>
    <div id="video-call-topbar-right-container">
      <button class="btn layout-btn">
        <GridLarge class="layout-icon" />
        <span class="text">Grid view</span>
        <ChevronDown class="icon" />
      </button>
      <img
        class="user-img"
        src="http://voxpopulii.in/system/static/dashboard/img/default_user.png"
        :style="{ 'margin-right': remoteVideoCount >= 1 ? '160px' : '0px' }"
      />
      <!-- <video
        v-show="showLocalVideoSmall"
        id="local-video-small"
        class="local-video"
        autoplay
        muted
      /> -->
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { Menu, ChevronDown, GridLarge, TimerOff } from "mdue";
import store from "@/store";

export default defineComponent({
  name: "VideoCallTopBar",
  components: {
    Menu,
    ChevronDown,
    GridLarge
  },
  props: {
    showLocalVideoSmall: {
      type: Boolean,
      default: false
    },
    remoteVideoCount: Number
  },
  emits: ["toggleChatList"],
  setup(props, { emit }) {
    const chatListVisible = ref(false);
    const duration = ref("");
    const showVideoCallContainer = computed<boolean>(
      () => store.getters["toggleVideoCallContainer"]
    );

    const digitString = (num: number) => {
      if (num <= 9) {
        return `0${num}`;
      } else {
        return num.toString();
      }
    };

    const handleDuration = () => {
      let seconds = 0;
      let minutes = 0;
      let hours = 0;
      let secs = "00";
      let mins = "00";
      let hrs = "00";
      return setInterval(() => {
        seconds++;
        secs = digitString(seconds);
        if (seconds === 60) {
          minutes++;
          mins = digitString(minutes);
          if (minutes === 60) {
            hours++;
            hrs = digitString(hours);
            minutes = 0;
            mins = digitString(minutes);
          }

          seconds = 0;
          secs = digitString(seconds);
        }

        duration.value = `${hrs}:${mins}:${secs}`;
      }, 1000);
    };

    const durationHandler = ref(handleDuration());

    const showChatList = () => {
      chatListVisible.value = !chatListVisible.value;
      emit("toggleChatList");
    };

    watch(showVideoCallContainer, show => {
      if (!show) {
        clearInterval(durationHandler.value);
      }
    });

    onMounted(() => {
      handleDuration();
    });

    return {
      showChatList
    };
  }
});
</script>
<style lang="scss" scoped>
#video-call-topbar {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  margin-top: auto;
  padding: 5px 20px;
  z-index: 2;

  #left-container {
    display: flex;
    align-items: center;

    .menu {
      display: flex;
      height: 40px;
      width: 40px;
      padding: 0;
      background-color: none;
      border-radius: 50%;

      .icon {
        margin: auto;
        font-size: 1.9em;
        color: rgb(53, 53, 53);
      }
    }

    .column {
      margin: 0 10px;

      #call-name {
        text-align: left;
        font-size: 1.4em;
        font-weight: 600;
        color: #fff;
        line-height: 1.2em;
      }

      #duration {
        text-align: left;
        font-size: 0.75em;
        font-weight: 600;
        color: rgb(155, 153, 153);
      }
    }
  }

  #video-call-topbar-right-container {
    display: flex;
    align-items: center;
    height: 100%;

    .layout-btn {
      .layout-icon {
        margin-right: 5px;
        color: #fff;
      }

      .text {
        font-size: 0.8em;
        color: #fff;
      }

      .icon {
        color: gray;
      }
    }

    .user-img {
      max-height: 100%;
      width: auto;
      border-radius: 50%;
    }

    #local-video-small {
      height: 90px;
      width: 140px;
      margin-left: 15px;
      border-radius: 5px;
      object-fit: cover;
    }
  }
}
</style>
