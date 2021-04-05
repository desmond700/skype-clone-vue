<template>
  <div id="sidebar">
    <div id="top-container">
      <div id="user-info-container">
        <div class="left">
          <button class="btn user-btn">
            <img
              class="user-img"
              src="http://voxpopulii.in/system/static/dashboard/img/default_user.png"
            />
            <span class="indicator" />
          </button>
          <div class="column">
            <p id="username">Desmond Wallace</p>
            <p id="status">Hello everyone.</p>
          </div>
        </div>
        <button class="btn menu-btn">
          <DotsHorizontal class="icon" />
        </button>
      </div>
      <div id="input-container">
        <button class="btn search-btn">
          <Magnify class="icon" />
        </button>
        <input class="form-control" placeholder="People, groups & messages" />
        <button class="btn dialpad">
          <Dialpad class="icon" />
        </button>
      </div>
      <div id="toggle-btns-container">
        <button
          class="btn toggle-btn column"
          :class="navItems.chats.selected ? 'active' : ''"
          @click="selectNavItem('chats')"
          @mouseover="navItems.chats.hover = true"
          @mouseleave="navItems.chats.hover = false"
        >
          <div class="chats-btn">
            <MessageText
              class="icon"
              style="transform: scaleX(-1)"
              v-if="navItems.chats.selected || navItems.chats.hover"
            />
            <MessageTextOutline
              class="icon"
              style="transform: scaleX(-1)"
              v-else
            />
            <div class="indicator">
              <span class="text">2</span>
            </div>
          </div>
          <span class="text">Chats</span>
        </button>
        <button
          class="btn toggle-btn column"
          :class="navItems.calls.selected ? 'active' : ''"
          @click="selectNavItem('calls')"
          @mouseover="navItems.calls.hover = true"
          @mouseleave="navItems.calls.hover = false"
        >
          <Phone
            class="icon"
            v-if="navItems.calls.selected || navItems.calls.hover"
          />
          <PhoneOutline class="icon" v-else />
          <span class="text">Calls</span>
        </button>
        <button
          class="btn toggle-btn column"
          :class="navItems.contacts.selected ? 'active' : ''"
          @click="selectNavItem('contacts')"
          @mouseover="navItems.contacts.hover = true"
          @mouseleave="navItems.contacts.hover = false"
        >
          <Contacts
            class="icon"
            v-if="navItems.contacts.selected || navItems.contacts.hover"
          />
          <ContactsOutline class="icon" v-else />
          <span class="text">Contacts</span>
        </button>
        <button
          class="btn toggle-btn column"
          :class="navItems.notifications.selected ? 'active' : ''"
          @click="selectNavItem('notifications')"
          @mouseover="navItems.notifications.hover = true"
          @mouseleave="navItems.notifications.hover = false"
        >
          <Bell
            class="icon"
            v-if="
              navItems.notifications.selected || navItems.notifications.hover
            "
          />
          <BellOutline class="icon" v-else />
          <span class="text">Notifications</span>
        </button>
      </div>
    </div>
    <div id="list-container">
      <component :is="currentNavigationItem + '-item'" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import {
  DotsHorizontal,
  MessageText,
  MessageTextOutline,
  Phone,
  PhoneOutline,
  Contacts,
  ContactsOutline,
  Bell,
  BellOutline,
  Magnify,
  Dialpad,
  Plus
} from "mdue";
import { NavigationItem } from "../../types";
import { socketIO } from "@/config";

export default defineComponent({
  name: "Sidebar",
  components: {
    DotsHorizontal,
    MessageTextOutline,
    MessageText,
    Phone,
    PhoneOutline,
    Contacts,
    ContactsOutline,
    Bell,
    BellOutline,
    Magnify,
    Dialpad,
    Plus
  },
  setup() {
    const currentNavigationItem = ref("chats");
    const previousNavigationItem = ref("");
    const navItems = ref({
      chats: {
        selected: false,
        hover: false
      },
      calls: {
        selected: false,
        hover: false
      },
      contacts: {
        selected: false,
        hover: false
      },
      notifications: {
        selected: false,
        hover: false
      }
    } as any);

    const selectNavItem = (item: string) => {
      if (currentNavigationItem.value !== item) {
        currentNavigationItem.value = item;

        navItems.value[item].selected = true;

        if (previousNavigationItem.value !== "") {
          navItems.value[previousNavigationItem.value].selected = false;
        }
        previousNavigationItem.value = item;
      }
    };


    onMounted(() => {
      socketIO.socket.connect();
      console.log("mounted");
      navItems.value[currentNavigationItem.value].selected = true;
      previousNavigationItem.value = currentNavigationItem.value;
    });

    return {
      currentNavigationItem,
      navItems,
      selectNavItem
    };
  }
});
</script>
<style lang="scss" scoped>
.active {
  .text,
  .icon {
    color: rgb(0, 120, 212) !important;
  }

  .chats-btn {
    .icon {
      color: rgb(0, 120, 212) !important;
    }
  }
}
#sidebar {
  position: relative;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  height: 100vh;
  width: 322px;
  border-right: 1px solid #e0e0e2;
  border: 2px solid pink;
  background-color: #f1f1f4;
  z-index: 2px;

  #top-container {
    height: 145px;
    padding: 5px 10px;
    border-bottom: 1px solid rgb(190, 189, 189);

    #user-info-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        .user-btn {
          position: relative;
          padding: 0;

          .user-img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }

          .indicator {
            bottom: -2px;
            right: 0;
            height: 13px;
            width: 13px;
            background-color: green;
            border: 2px solid #f1f1f4;
          }
        }
        .column {
          margin: 0 10px;

          #username {
            text-align: left;
            font-size: 0.9em;
            color: rgb(56, 55, 55);
          }

          #status {
            text-align: left;
            font-size: 0.75em;
            color: rgb(119, 117, 117);
          }
        }
      }

      .menu-btn {
        padding: 5px 0;

        .icon {
        }
      }
    }

    #input-container {
      display: flex;
      align-items: center;
      background-color: #fff;
      border: 1px solid rgb(190, 188, 188);
      border-radius: 5px;
      margin: 12px 0;

      .search-btn {
        padding: 0 5px;

        .icon {
          font-size: 1.2em;
        }
      }

      input {
        height: 30px;
        padding: 5px 0px;
        border: none;
        border-radius: 0;
        font-size: 0.85em;
      }
      .dialpad {
        height: 30px;
        padding: 0 5px;
        border: none;
        border-left: 1px solid rgb(190, 188, 188);
        border-radius: 0;

        .icon {
          font-size: 1em;
        }
      }
    }

    #toggle-btns-container {
      display: flex;
      flex-wrap: nowrap;

      .toggle-btn {
        display: flex;
        flex: 25%;
        padding: 0;

        .chats-btn {
          height: 19px;
          margin: 0 auto;
        }

        .icon {
          margin: 0 auto;
          font-size: 1.2em;
          color: rgb(73, 72, 72);
        }
        .text {
          margin: 0 auto;
          margin-top: 2px;
          font-size: 0.65em;
          color: rgb(158, 157, 157);
        }
      }

      .chats-btn {
        position: relative;

        .indicator {
          display: flex;
          position: absolute;
          top: 0;
          right: -8px;
          height: 16px;
          min-width: 16px;
          padding: 2px;
          background-color: red;
          border: 2px solid #f1f1f4;
          border-radius: 14.5px;

          .text {
            height: fit-content;
            width: fit-content;
            margin: auto;
            font-size: 0.6em;
            font-weight: 600;
            color: #fff !important;
            line-height: 0.9em;
          }
        }
      }
    }
  }

  #list-container {
    display: flex;
    flex-direction: column;
    height: calc(100% - 145px);
  }
}
</style>
