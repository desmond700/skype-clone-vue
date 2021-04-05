<template>
  <div class="navigation-item-action-container">
    <button class="btn header-btn">
      <VideoOutline class="icon" />
      <span class="text">Meet Now</span>
      <ChevronDown class="icon" />
    </button>
    <button class="btn">
      <PhonePlusOutline class="icon" />
      <span class="text">New Call</span>
    </button>
  </div>
  <div><h4>Calls</h4></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ChevronDown, PhonePlusOutline, VideoOutline } from "mdue";

export default defineComponent({
  name: "Calls",
  components: {
    ChevronDown,
    PhonePlusOutline,
    VideoOutline
  }
});
</script>
<style lang="scss" scoped></style>
