<template>
  <div id="message-view"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MessageView"
});
</script>
<style lang="scss" scoped>
#message-view {
  flex: 1 1 auto;
  flex-grow: 1;
  border: 1px solid blue;
}
</style>
