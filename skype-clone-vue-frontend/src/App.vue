<template>
  <VideoCall v-if="startVideoChat.open" :videoChatEvent="startVideoChat.event" />
  <component :is="layout" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import store from "./store";
import VideoCall from "@/components/video-call/VideoCall.vue";
import CallHandler from "./helpers/CallHandler";

export default defineComponent({
  name: "App",
  data: () => ({
    layout: "default-layout"
  }),
  components: {
    VideoCall
  },
  provide: {
    callHandler: new CallHandler()
  },
  computed: {
    startVideoChat(): boolean {
      return store.getters["startVideoChat"];
    }
  },
  watch: {
    $route(route) {
      this.layout = `${route.meta.layout}-layout`;
    }
  }
})
</script>
<style lang="scss">
#app {
  display: flex;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
</style>
