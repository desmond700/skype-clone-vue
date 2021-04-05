import { createStore } from "vuex";
import { userModule, chatModule } from "./modules/";

export default createStore({
  state: {
    startVideoChat: {}
  },
  mutations: {
    START_VIDEO_CHAT(state: any, startVideoChat: object) {
      state.startVideoChat = startVideoChat;
    }
  },
  actions: {
    startVideoChat(context: any, startVideoChat: object) {
      context.commit("START_VIDEO_CHAT", startVideoChat);
    }
  },
  getters: {
    startVideoChat(state: any): boolean {
      return state.startVideoChat;
    }
  },
  modules: {
    user: userModule,
    chat: chatModule
  }
});
