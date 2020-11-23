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
          <button>➥</button>
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
    selectOpponent() {
      // TODO
    }
  },
  mounted() {
    if (!this.$store.state.mySocket.isPlaying) {
      this.$router.replace("/");
      return;
    }
    this.getOpponents();
  },
  socket: {
    alreadyPlaying(data) {
      console.log(data.message);
    }
  }
};
</script>

<style></style>
