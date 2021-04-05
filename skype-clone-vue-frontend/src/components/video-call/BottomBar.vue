<template>
  <div id="video-call-bottombar">
    <div id="control-btns">
      <button
        class="btn mic-btn"
        :class="microphoneState ? 'on' : 'off'"
        @click="microphoneState = !microphoneState"
      >
        <MicrophoneOutline class="icon" v-if="microphoneState" />
        <MicrophoneOff class="icon" v-else />
      </button>
      <button
        class="btn video-btn"
        :class="videoState ? 'on' : 'off'"
        @click="videoState = !videoState"
      >
        <VideoOutline class="icon" v-if="videoState" />
        <VideoOffOutline class="icon" v-else />
      </button>
      <button class="btn call-hangup-btn" @click="endCall">
        <PhoneHangupOutline class="icon" />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  MicrophoneOutline,
  MicrophoneOff,
  PhoneHangupOutline,
  VideoOutline,
  VideoOffOutline
} from "mdue";

export default defineComponent({
  name: "VideoCallBottomBar",
  components: {
    MicrophoneOutline,
    MicrophoneOff,
    PhoneHangupOutline,
    VideoOutline,
    VideoOffOutline
  },
  data: () => ({
    microphoneState: true,
    videoState: true
  }),
  emits: ["handleMicrophoneState", "handleVideoState", "hangUpVideoCall"],
  watch: {
    microphoneState() {
      this.$emit("handleMicrophoneState");
    },
    videoState() {
      this.$emit("handleVideoState");
    }
  },
  methods: {
    endCall() {
      this.$emit("hangUpVideoCall");
    }
  }
});
</script>
<style lang="scss" scoped>
.on {
  background-color: #fff;

  .icon {
    color: rgb(39, 39, 39);
  }
}
.off {
  background-color: rgb(51, 51, 51);

  .icon {
    color: gray;
  }
}

#video-call-bottombar {
  display: flex;
  align-items: center;
  min-height: 70px;
  max-width: 100%;
  background-color: #1f1f1f;

  #control-btns {
    display: flex;
    justify-content: space-evenly;
    width: 190px;
    margin: 0 auto;

    .btn {
      display: flex;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      padding: 0;

      .icon {
        margin: auto;
        font-size: 1.3em;
      }
    }

    .call-hangup-btn {
      background-color: red;

      .icon {
        color: #fff;
      }
    }
  }
}
</style>
