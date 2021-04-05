<template>
  <div
    id="video-container"
    :style="{ 'align-content': counter >= 2 ? 'center' : 'unset' }"
  >
    <Skype id="skype-icon" />
    <!-- <button class="btn remove-video-btn" @click="removeRemoteVideo">
      remove video
    </button>
    <button class="btn add-video-btn" @click="addRemoteVideo">Add video</button> -->
    <video id="local-video" autoplay muted />
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, onMounted } from "vue";
import { Skype } from "mdue";
import { CallHandlerType } from "@/helpers/CallHandler";

export default defineComponent({
  name: "VideoContainer",
  components: {
    Skype
  },
  setup() {
    // const counter = 0;
    const callHandler = inject<CallHandlerType>("callHandler");

    onMounted(() => {
      console.log("videoContainer mounted");
      const videoContainer = document.getElementById(
        "video-container"
      ) as HTMLDivElement;
      callHandler?.setvideoContainer(videoContainer);
    });

    return {};
  }
});
</script>
<style lang="scss" scoped>
#video-container {
  //position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  flex: 1 1 auto;
  max-width: 100%;
  border: 1px solid blue;
  overflow-y: auto;

  .remote-video {
    //flex-grow: 1;
    //height: auto;
    margin: 2px;
    background-color: rgb(88, 88, 88);
    object-fit: cover;
  }

  #remote-video {
    flex-grow: 1;
    //height: auto;
    margin: 2px;
    background-color: rgb(88, 88, 88);
    object-fit: cover;
  }

  .add-video-btn {
    position: absolute;
    bottom: 10px;
    height: fit-content;
    right: 10px;
    background-color: #fff;
    z-index: 5;
  }

  .remove-video-btn {
    position: absolute;
    bottom: 10px;
    right: 130px;
    background-color: #fff;
    z-index: 5;
  }

  #skype-icon {
    position: absolute;
    left: 10px;
    bottom: 80px;
    font-size: 3.5em;
    color: rgb(87, 88, 88);
  }

  #local-video {
    max-height: 100%;
    flex-grow: 1;
    object-fit: cover;
  }
}
</style>
