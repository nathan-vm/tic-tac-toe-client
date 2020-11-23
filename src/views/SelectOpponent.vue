<template>
  <div>
    <h1>Select your opponent</h1>
    <table style="width:100%">
      <tr>
        <th>Name</th>
        <th>Wins</th>
        <th>Draws</th>
        <th>Played</th>
        <th />
      </tr>
      <tr v-for="opponent in opponents" v-bind:key="opponent.id">
        <td>{{ opponent.name }}</td>
        <td>{{ opponent.won }}</td>
        <td>{{ opponent.draw }}</td>
        <td>{{ opponent.played }}</td>
        <td>
          <button @click="selectOpponent(opponent)">➥</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "SelectOpponents",
  computed: {
    opponents() {
      return this.$store.state.opponents || [];
    }
  },
  methods: {
    getOpponents() {
      this.$socket.emit("getOpponents");
    },
    selectOpponent(opponent) {
      this.$store.commit("SET_myOpponent", opponent);
      this.$socket.emit("selectOpponent", { id: opponent.id });
    }
  },
  mounted() {
    if (
      !this.$store.state.mySocket.name ||
      this.$store.state.mySocket?.isPlaying
    ) {
      this.$router.replace("/");
      return;
    }
    this.getOpponents();
  },
  sockets: {
    alreadyPlaying(data) {
      console.log(data.message);
    },
    gameStarted() {
      this.$router.push("/game");
    }
  }
};
</script>

<style></style>
