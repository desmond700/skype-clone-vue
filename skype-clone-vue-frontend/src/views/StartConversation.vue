<template>
  <div id="start-conversation">
    <h1 id="header">Welcome, desmond</h1>
    <div id="user-container">
      <span id="user-initials">dw</span>
      <span class="indicator" />
    </div>
    <div id="create-status">
      <input
        class="form-control"
        placeholder="Tell your friends what you're up to"
      />
      <button class="btn">
        <PencilOutline class="icon" />
      </button>
    </div>
    <button class="btn start-conversation-btn">Start a conversation</button>
    <p id="info">
      Search for someone to start chatting with or go to Contacts to see who is
      available
    </p>
  </div>
  <p id="not-you">Not you? <router-link to="/">Check account</router-link></p>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PencilOutline } from "mdue";

export default defineComponent({
  name: "StartConversation",
  components: {
    PencilOutline
  }
});
</script>
<style lang="scss" scoped>
#start-conversation {
  width: 70%;
  margin: auto;

  #header {
    margin: 10px 0 20px 0;
    font-weight: 600;
  }

  #user-container {
    position: relative;
    display: flex;
    height: 120px;
    width: 120px;
    margin: 35px auto;
    background-color: #000000;
    border-radius: 50%;

    #user-initials {
      margin: auto;
      font-size: 1.9em;
      font-weight: 600;
      color: blue;
    }

    .indicator {
      bottom: 5px;
      right: 9px;
      height: 18px;
      width: 18px;
      background-color: green;
      border: 2px solid #f1f1f4;
    }
  }

  #create-status {
    display: flex;
    align-items: center;
    max-width: 430px;
    margin: 0 auto;
    border-bottom: 1px solid rgb(189, 187, 187);

    input {
      height: 30px;
      padding: 2px 5px;
      text-align: center;
      font-size: 0.9em;
      border: none;
    }
  }

  .start-conversation-btn {
    height: 40px;
    margin: 35px 0 25px 0;
    padding: 0 25px;
    font-size: 0.9em;
    font-weight: 600;
    background-color: #000000;
    color: #fff;
    border-radius: 20px;
  }

  #info {
    max-width: 320px;
    margin: 0 auto;
    font-size: 0.9em;
    color: gray;
  }
}

#not-you {
  margin-top: auto;
}
</style>
