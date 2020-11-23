<template>
  <div class="gamePage">
    <h1>Game</h1>
    <Playboard />
  </div>
</template>

<script>
import Playboard from "@/components/Playboard.vue";
export default {
  name: "Game",
  components: { Playboard },
  mounted() {
    if (!this.$store.state.mySocket.isPlaying) {
      this.$router.replace("/");
    }
  }
};
</script>

<style>
.gamePage {
  background: #eee;
}
</style>
