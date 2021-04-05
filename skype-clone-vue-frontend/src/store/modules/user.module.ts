import {
  ActiveRoom,
  ACTIVE_ROOM_NORMALISED,
  User,
  USER_NORMALISED
} from "../../../types";

export const userModule = {
  namespaced: true,
  state: () => ({
    user: USER_NORMALISED,
    isAuthenticated: false,
    activeRoom: ACTIVE_ROOM_NORMALISED,
    contacts: Array<User>()
  }),
  mutations: {
    SET_CURRENT_USER(state: any, user: User) {
      state.user = user;
      console.log("state.user: ", state.user);
    },
    SET_AUTHENTICATION_STATE(state: any, isAuthenticated: boolean) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_ONLINE_STATUS(state: any, status: boolean) {
      state.user.isOnline = status;
    },
    SET_ACTIVE_ROOM(state: any, activeRoom: ActiveRoom) {
      state.activeRoom = activeRoom;
    },
    SET_CONTACTS(state: any, contacts: Array<User>) {
      state.contacts = contacts;
    }
  },
  actions: {
    setCurrentUser(context: any, user: User) {
      context.commit("SET_CURRENT_USER", user);
    },
    setAuthenticationState(context: any, isAuthenticated: boolean) {
      context.commit("SET_AUTHENTICATION_STATE", isAuthenticated);
    },
    setOnlineStatus(context: any, status: boolean) {
      context.commit("SET_ONLINE_STATUS", status);
    },
    setActiveRoom(context: any, activeRoom: ActiveRoom) {
      context.commit("SET_ACTIVE_ROOM", activeRoom);
    },
    setContacts(context: any, contacts: Array<User>) {
      context.commit("SET_CONTACTS", contacts);
    }
  },
  getters: {
    currentUser(state: any): User {
      return state.user;
    },
    activeRoom(state: any): ActiveRoom {
      return state.activeRoom;
    },
    contacts(state: any): Array<User> {
      return state.contacts;
    },
    isAuthenticated(state: any): boolean {
      return state.isAuthenticated;
    }
  }
};
