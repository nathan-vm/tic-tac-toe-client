import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import socketio from "socket.io-client";
import VueSocketIO from "vue-socket.io";

export const SocketInstance = socketio("http://localhost:3333");

Vue.use(
  new VueSocketIO({
    connection: SocketInstance,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
