<template>
  <div class="container">
    <button @click="handleClick(playboard)">aaaaa</button>
    <div
      class="col"
      v-for="column in playboard"
      :key="playboard.indexOf(column)"
    >
      <div
        class="block"
        v-for="block in column"
        :key="column.indexOf(block) + 33"
      >
        {{ block }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Playboard",
  data: function() {
    return {
      playboard: [
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
      ]
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-self: center;
  width: 50%;
  height: 50vh;
  background: #c30;
}
.col {
  width: 100px;
}
</style>
