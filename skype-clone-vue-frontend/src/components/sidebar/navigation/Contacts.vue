<template>
  <div class="navigation-item-action-container">
    <button class="btn new-contact-btn">
      <AccountPlusOutline class="icon" />
      <span class="text">New Contact</span>
    </button>
  </div>
  <div class="navigation-item-header-container">
    <button class="btn header-btn">
      <span class="text">CONTACTS</span>
      <ChevronDown class="icon" />
    </button>
  </div>
  <div class="scroll-container">
    <template v-for="(contacts, letter) in groupContact" :key="letter">
      <p class="group-letter-header">{{ letter }}</p>
      <router-link
        :to="{ name: 'Chat', params: { chat: contact.username } }"
        class="contact-container"
        v-for="(contact, index) in contacts"
        :key="index"
        @click.passive="selectContact(contact)"
      >
        <div class="user-img-container ">
          <img
            v-if="contact.imgUrl"
            class="contact-img"
            :src="contact.imgUrl"
          />
          <span class="initials" v-else>
            {{ contactInitials(contact) }}
          </span>
          <div class="indicator"></div>
        </div>
        <div id="info-container">
          <p id="name">{{ contact.firstname }} {{ contact.lastname }}</p>
          <p id="status">{{ contact.status }}</p>
        </div>
      </router-link>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { AccountPlusOutline, ChevronDown } from "mdue";
import { GROUP_CONTACT_NORMALISED, User } from "../../../../types";
import { groupByLetter } from "@/helpers";
import store from "@/store";

export default defineComponent({
  name: "Contacts",
  components: {
    AccountPlusOutline,
    ChevronDown
  },
  data() {
    return {
      groupContact: GROUP_CONTACT_NORMALISED
    };
  },
  computed: {
    contactsSorted(): Array<User> {
      const allContacts = this.allContacts as Array<User>;
      return allContacts.sort((a: User, b: User) => {
        const contact1 = a.firstname;
        const contact2 = b.firstname;
        return contact1 < contact2 ? -1 : contact1 > contact2 ? 1 : 0;
      });
    },
    allContacts(): Array<User> {
      return store.getters["user/contacts"];
    }
  },
  mounted() {
    console.log("contactsSorted: ", this.contactsSorted);
    this.groupContact = groupByLetter(this.contactsSorted);
    console.log("groupContact: ", this.groupContact);
  },
  methods: {
    contactInitials(contact: any) {
      return (
        contact.firstname.charAt(0).toUpperCase() +
        contact.lastname.charAt(0).toUpperCase()
      );
    },
    selectContact(contact: any) {
      store.dispatch("chat/setdirectChatRecipient", contact);
    }
  }
});
</script>
<style lang="scss" scoped>
.new-contact-btn {
  justify-content: center;
  width: 100%;
  margin: 0 10px;
}

.group-letter-header {
  margin: 15px 10px 0 10px;
  text-align: left;
  font-size: 0.8em;
  font-weight: 600;
  color: rgb(126, 126, 126);
  line-height: 1em;
}

.contact-container {
  display: flex;
  padding: 10px;
  text-decoration: none;

  &:hover {
    background-color: #d5effc;

    .chat-item-img-container .indicator {
      border-color: #d5effc;
    }
  }

  .user-img-container {
    width: 40px;
    height: 40px;
  }

  #info-container {
    height: fit-content;
    margin: auto 10px;

    .text {
    }

    #name {
      text-align: left;
      font-size: 0.9em;
      color: rgb(46, 46, 46);
    }

    #status {
      text-align: left;
      font-size: 0.8em;
      color: gray;
    }
  }
}
</style>
