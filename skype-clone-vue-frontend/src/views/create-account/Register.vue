<template>
  <div id="container">
    <h3 class="mb-5">Create a SkypeClone Account</h3>
    <form @submit.prevent="submitData" class="row">
      <div class="form-group row">
        <label for="" class="col-md-3">Username</label>
        <div class="col-md-9 px-0">
          <input
            type="text"
            class="form-control"
            :class="
              validator.username.error ? 'error-border' : 'default-border'
            "
            v-model.lazy="username"
            
          />
          <div v-show="validator.username.submitted">
            <p class="error-message" v-show="validator.username.error">
              {{ validator.username.message }}
            </p>
            <p class="success-message" v-show="!validator.username.error">
              {{ validator.username.message }}
            </p>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="" class="col-md-3">Firstname</label>
        <div class="col-md-9 px-0">
          <input
            type="text"
            class="form-control"
            v-model="firstname"
            
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="" class="col-md-3">Lastname</label>
        <div class="col-md-9 px-0">
          <input type="text" class="form-control" v-model="lastname"  />
        </div>
      </div>
      <div class="form-group row">
        <label for="" class="col-md-3">Email</label>
        <div class="col-md-9 px-0">
          <input
            type="email"
            class="form-control"
            :class="validator.email.error ? 'error-border' : 'default-border'"
            v-model.lazy="email"
            autocomplete="email"
            
          />
          <div v-show="validator.email.submitted">
            <p class="error-message" v-show="validator.email.error">
              {{ validator.email.message }}
            </p>
            <p class="success-message" v-show="!validator.email.error">
              {{ validator.email.message }}
            </p>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="" class="col-md-3">Password</label>
        <div class="col-md-9 px-0">
          <input
            type="password"
            class="form-control"
            v-model="password"
            autocomplete="password"
            
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary my-4">Submit</button>
    </form>
    <div v-show="registered" class="alert alert-success" role="alert">
      New user
      <span class="alert-link">{{ firstname }} {{ lastname }}</span>
      registered successfully.
    </div>
    <hr class="my-4" />
    <div class="login-account">
      <p>
        Already have an account?
        <router-link to="/login">Login.</router-link>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { USER_NORMALISED } from "../../../types";
import { defineComponent } from "vue";
import { HttpRequest } from "../../config";
import store from "@/store";

export default defineComponent({
  name: "Register",
  data: () => ({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    registered: true,
    validator: {
      username: {
        submitted: false,
        error: false,
        message: ""
      },
      email: {
        submitted: false,
        error: false,
        message: ""
      }
    }
  }),
  watch: {
    username: function(text: string) {
      HttpRequest.getUsernameAvailability(text)
        .then(response => {
          switch (response.status) {
            case 200:
              this.validator.username = { ...response.data, submitted: true };
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    email: function(text: string) {
      this.validator.email.submitted = true;
      HttpRequest.getEmailAvailability(text)
        .then(response => {
          switch (response.status) {
            case 200:
              this.validator.email = { ...response.data, submitted: true };
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  methods: {
    submitData() {
      console.log("this.$data: ", this.$data)
      HttpRequest.register(this.$data)
        .then(response => {
          let user = USER_NORMALISED;
          switch (response.status) {
            case 200:
              user = response.data;
              store.dispatch("user/setCurrentUser", user);
              this.$router.push({
                name: "SetupAccount",
                params: {}
              });
              console.log("registered successsfully.");
              break;
          }
        })
        .catch(error => {
          console.log("error registering user: ", error);
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
  padding: 30px;
  margin: 10px auto;
}

.alert {
  margin: 0 -15px;
}

.error-message {
  text-align: left;
  font-size: 0.9em;
  font-weight: 600;
  color: red;
}

.success-message {
  text-align: left;
  font-size: 0.9em;
  font-weight: 600;
  color: green;
}

.error-border {
  border: 1px solid red;
}

.default-border {
  border: none;
}

.btn {
  width: fit-content;
}
.form-group {
  align-items: center;
  margin: 10px 0;
  .login-account {
    padding-bottom: 30px;
  }
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
