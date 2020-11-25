<template>
  <main>
    <div>{{ finish }}</div>
    <button v-if="endGame" @click="handlePlayAgain">Voltar a seleção</button>
    <div class="board">
      <template v-for="(row, indexi) in playboard_socket">
        <div
          :class="className(block)"
          v-for="(block, indexj) in row"
          :key="block.id"
          @click="() => handleClick(indexi, indexj)"
        >
          {{ block }}
        </div>
      </template>
    </div>
  </main>
</template>

<script>
export default {
  name: "Playboard",
  data: function() {
    return {
      playboard: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ]
    };
  },
  computed: {
    playboard_socket() {
      if (this.$store.state.game?.playboard) {
        console.log(this.$store.state.game?.playboard);
        return this.$store.state.game?.playboard;
      }
      return this.playboard;
    },
    finish() {
      if (this.$store.state.game?.gameStatus === "won") {
        if (
          this.$store.state.game?.gameWinner === this.$store.state.mySocket.id
        ) {
          return "Ganhou";
        } else if (
          this.$store.state.game?.gameWinner !== this.$store.state.mySocket.id
        ) {
          return "Perdeu";
        }
      } else if (this.$store.state.game?.gameStatus === "draw") {
        return "Empatou";
      }
      return null;
    },
    myTurn() {
      if (this.$store.state.myTurn) {
        return true;
      }
      return false;
    },
    endGame() {
      if (this.$store.state.game?.gameStatus === "ongoing") {
        return false;
      }
      return true;
    }
  },
  methods: {
    className(element) {
      if (!this.myTurn || this.endGame) {
        return `cell ${element} not-your-turn`;
      }
      return `cell ${element}`;
    },
    handleClick(i, j) {
      if (this.myTurn && !this.endGame) {
        const gameId = this.$store.state.game.gameId;
        const player = this.$store.state.mySocket.id;
        this.$socket.emit("selectCell", { player, gameId, i, j });
      }
    },
    handlePlayAgain() {
      this.$store.commit("SET_clearGame");

      this.$router.replace("/select");
    }
  }
};
</script>

<style>
:root {
  --O-color: #ffe900;
  --X-color: #314cb6;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 120px);
  grid-template-rows: repeat(3, 100px);
  gap: 0.5rem;
}

.cell {
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid #000;
  border-radius: 5px;
  font-size: 3rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.not-your-turn {
  cursor: not-allowed;
}

.cell.O {
  background-color: var(--O-color);
  cursor: not-allowed;
}
.cell.X {
  background: var(--X-color);
  cursor: not-allowed;
}

.cell:not(.O):not(.X):hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.1);
}
</style>
