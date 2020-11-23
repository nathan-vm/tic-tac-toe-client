<template>
  <div>
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
    if (!this.$store.mySocket.isPlaying) {
      this.$router.replace("/");
    }
  }
};
</script>

<style></style>
