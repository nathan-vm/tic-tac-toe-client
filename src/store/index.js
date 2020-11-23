import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mySocket: {},
    opponents: [],
    game: {}
  },

  mutations: {
    SOCKET_connected(state, data) {
      console.log("connected: ", data.id);
      state.mySocket = data;
    },
    SOCKET_disconnect(state) {
      state.mySocket = {
        mySocket: {},
        myOpponent: {},
        opponents: [],
        game: {}
      };
    },
    SOCKET_LoginResponse(state, data) {
      console.log("login: ", data);
      state.mySocket = { ...state.mySocket, ...data };
    },
    SOCKET_getOpponentsResponse(state, data) {
      console.log("opponents:", data);
      state.opponents = data;
    },
    SOCKET_newOpponent(state, data) {
      console.log("new opponent:", data);
      state.opponents = [...state.opponents, data];
    },
    SET_myOpponent(state, data) {
      console.log("myOpponent", data);
      state.myOpponent = data;
    },
    SOCKET_excludePlayers(state, data) {
      console.log(
        `opponents start a game: player1: ${data.player1}, player2: ${data.player2}`
      );
      let newOpponents = state.opponents;
      newOpponents = newOpponents.filter(
        opponent => opponent.id !== data.player1 && opponent.id !== data.player2
      );

      state.opponents = newOpponents;
    },
    SOCKET_gameStarted(state, data) {
      console.log("game start:", data);
      state.mySocket.isPlaying = true;
      state.mySocket.gameId = data.gameId;
      state.game = data;
    },
    SOCKET_opponentDisconnected(state, data) {
      console.log("opponent disconnected:", data.id);
      let newOpponents = state.opponents;
      newOpponents = newOpponents.filter(opponent => opponent.id !== data.id);

      state.opponents = newOpponents;
    },
    SOCKET_opponentLeft(state) {
      state.myOpponent = {};
      state.game = {};
    }
  }
});
