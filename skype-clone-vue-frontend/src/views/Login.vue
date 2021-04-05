<template>
  <div id="container">
    <h3 class="mb-5">Login to Your SkypeClone Account</h3>
    <form @submit.prevent="submitData" class="row">
      <div class="form-group row">
        <label for="" class="col-sm-2">Username</label>
        <div class="col-sm-10 px-0">
          <input type="text" class="form-control" v-model="username" />
        </div>
      </div>
      <div class="form-group row">
        <label for="" class="col-sm-2">Password</label>
        <div class="col-sm-10 px-0">
          <input type="text" class="form-control" v-model="password" />
        </div>
      </div>
      <div class="form-group d-flex p-0">
        <div class=" d-flex justify-content-start col-sm-2">
          <input type="checkbox" v-model="rememberMe" />
        </div>
        <div class="d-flex col-sm-10 justify-content-start">
          <span style="padding-top: 3px">Remember me</span>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mt-4">Submit</button>
    </form>
    <hr class="my-4" />
    <div class="login-account">
      <p>
        Need an account?
        <router-link to="/create-account">Register.</router-link>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { HttpRequest } from "../config";
import store from "@/store";
import { User, USER_NORMALISED } from "../../types";

export default defineComponent({
  name: "Login",
  layout: "Default",
  data: () => ({
    username: "",
    password: "",
    rememberMe: false
  }),
  created() {
    HttpRequest.getUserData()
      .then(response => {
        const { user, isAuthenticated } = response.data;
        switch (response.status) {
          case 200:
            if (isAuthenticated) {
              store.dispatch("user/setCurrentUser", user);
              store.dispatch("user/setAuthenticationState", isAuthenticated);
              this.$router.push({ name: "Skype", params: {} });
            }
            break;
        }
      })
      .catch(error => console.log(error));
  },
  methods: {
    submitData() {
      HttpRequest.login(this.$data)
        .then(response => {
          const { user, isAuthenticated } = response.data;
          switch (response.status) {
            case 200:
              console.log("login Successful");
              console.log("user: ", user);
              console.log("isAuthenticated: ", isAuthenticated);
              store.dispatch("user/setCurrentUser", user);
              store.dispatch("user/setAuthenticationState", isAuthenticated);
              this.$router.push({ name: "Skype", params: {} });
              break;
          }
        })
        .catch(error => {
          console.log("login error: ", error);
        });
    }
  }
});
</script>

<style lang="scss" scoped>
label {
  height: fit-content;
  text-align: left;
  padding: 0;
}
#container {
  align-self: center;
  height: fit-content;
  width: 65%;
  margin: 0 auto;
}

.btn {
  width: fit-content;
}
.form-group {
  align-items: center;
  margin: 10px 0;
  padding: 0;
}
.form-control {
  background-color: rgb(211, 206, 206);

  &:focus {
    background-color: white;
  }
}
.login-account {
  padding-bottom: 30px;
}
</style>
