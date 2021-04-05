import { HttpRequest } from "@/config";
import { navigationGuardHandler } from "@/helpers";
import store from "@/store";
import { User } from "types";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "Login" }
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "default",
      requiresAuth: false
    },
    component: () => import("../views/Login.vue")
  },
  {
    path: "/create-account",
    name: "CreateAccount",
    meta: {
      layout: "default",
      requiresAuth: false
    },
    component: () => import("../views/create-account/Register.vue")
  },
  {
    path: "/create-account/setup",
    name: "SetupAccount",
    meta: {
      layout: "default",
      requiresAuth: true
    },
    component: () => import("../views/create-account/SetupAccount.vue")
  },
  {
    path: "/skype",
    name: "Skype",
    meta: {
      layout: "asymmetrical",
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/StartConversation.vue")
  },
  {
    path: "/skype/chat/:chat",
    name: "Chat",
    meta: {
      layout: "asymmetrical",
      requiresAuth: true
    },
    component: () => import("../views/ChatView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  console.log("to: ", to);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = store.getters["user/currentUser"] as User;
    const isAuthenticated = store.getters["user/isAuthenticated"] as boolean;
    console.log("get user: ", user);
    if (user._id === "") {
      HttpRequest.getUserData()
        .then(response => {
          const { user, isAuthenticated } = response.data;
          switch (response.status) {
            case 200:
              console.log("user: ", user);
              console.log("isAuthenticated: ", isAuthenticated);
              store.dispatch("user/setAuthenticationState", isAuthenticated);
              store.dispatch("user/setCurrentUser", user);
              navigationGuardHandler(user, isAuthenticated, to, next);
              break;
            case 500:
              next({ name: "Login" });
              break;
          }
        })
        .catch(() => {
          next({ name: "Login" });
        });
    } else {
      navigationGuardHandler(user, isAuthenticated, to, next);
    }
  } else {
    next();
  }
});


export default router;
