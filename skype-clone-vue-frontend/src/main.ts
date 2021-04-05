import "bootstrap";
import "webrtc-adapter";
import "@/style/custom.scss";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SingleColumnLayout from "./layout/SingleColumn.vue";
import AsymmetricalLayout from "./layout/Asymmetrical.vue";
import Chats from "./components/sidebar/navigation/Chats.vue";
import Calls from "./components/sidebar/navigation/Calls.vue";
import Contacts from "./components/sidebar/navigation/Contacts.vue";
import Notifications from "./components/sidebar/navigation/Notifications.vue";

createApp(App)
  .component("default-layout", SingleColumnLayout)
  .component("asymmetrical-layout", AsymmetricalLayout)
  .component("chats-item", Chats)
  .component("calls-item", Calls)
  .component("contacts-item", Contacts)
  .component("notifications-item", Notifications)
  .use(store)
  .use(router)
  .mount("#app");
