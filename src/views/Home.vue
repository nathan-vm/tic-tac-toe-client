<template>
  <div class="home">
    <h1>Jogo da velha</h1>
    <input v-model="name" placeholder="Preencha seu nome de usuário" />
    <button type="button" @click="Login">Entrar</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
      name: ""
    };
  },
  methods: {
    Login() {
      if (this.name) {
        this.$socket.emit("Login", { name: this.name });
      }
    }
  },
  sockets: {
    LoginResponse() {
      this.$router.push("/select");
    }
  }
};
</script>
