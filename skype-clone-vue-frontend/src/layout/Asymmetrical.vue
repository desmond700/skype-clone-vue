<template>
  <Sidebar />
  <div id="main">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";

export default defineComponent({
  name: "AsymmetricalLayout",
  components: {
    Sidebar
  }
});
</script>
<style lang="scss" scoped>
#main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
