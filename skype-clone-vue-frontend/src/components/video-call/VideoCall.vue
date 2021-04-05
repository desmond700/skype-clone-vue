<template>
  <div
    id="video-call-container"
    :style="{ width: showChatList ? 'calc(100% - 322px)' : '100%' }"
  >
    <top-bar
      :showLocalVideoSmall="showLocalVideoSmall"
      @toggleChatList="showChatList = !showChatList"
      :remoteVideoCount="remoteVideoCount"
    />
    <video-container @addRemoteVideo="addRemoteVideo($event)" />
    <bottom-bar
      @handleMicrophoneState="handleMicrophoneState"
      @handleVideoState="handleVideoState"
      @hangUpVideoCall="hangUpVideoCall"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import TopBar from "./TopBar.vue";
import VideoContainer from "./VideoContainer.vue";
import BottomBar from "./BottomBar.vue";
import { CallHandlerType } from "@/helpers/CallHandler";

export default defineComponent({
  name: "VideoCallContainer",
  components: {
    TopBar,
    VideoContainer,
    BottomBar
  },
  props: {
    videoChatEvent: {
      type: String
    }
  },
  setup() {
    const showChatList = ref(false);
    const showLocalVideoSmall = ref(false);
    const remoteVideoCount = ref(0);
    const shrinkLocalVideo = ref(false);
    const callHandler = inject<CallHandlerType>("callHandler");

    const handleMicrophoneState = () => callHandler?.toggleMicrophoneState();

    const handleVideoState = () => callHandler?.toggleVideoState();

    const hangUpVideoCall = () => callHandler?.endVideoCall();

    const addRemoteVideo = (counter: number) => {
      remoteVideoCount.value = counter;
      if (counter > 0) {
        shrinkLocalVideo.value = true;
      } else {
        shrinkLocalVideo.value = false;
      }
    };

    onMounted(() => {
      const localVideo = document.getElementById(
        "local-video"
      ) as HTMLVideoElement;
      localVideo?.classList.add("shrink-local-video");

      shrinkLocalVideo.value = true;

      callHandler?.handleLocalVideo(localVideo);
    });

    // watch(shrinkLocalVideo, (shrinkLocalVideo) => {
    //   if (shrinkLocalVideo) {
    //     console.log("shrinkLocalVideo");
    //     localVideo.value?.classList.add("shrink-local-video");
    //   } else {
    //     console.log("enLargeLocalVideo");
    //     localVideo.value?.classList.remove("shrink-local-video");
    //   }
    // })

    return {
      handleMicrophoneState,
      handleVideoState,
      hangUpVideoCall,
      showChatList,
      addRemoteVideo,
      showLocalVideoSmall,
      remoteVideoCount
    };
  }
});
</script>
<style lang="scss" scoped>
#video-call-container {
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #2c2b33;
  border: 2px solid red;
  z-index: 999999;
  transition: width 0.2s ease;
}
</style>

function closeVideoCall() { throw new Error("Function not implemented."); }
