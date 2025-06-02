<template>
  <div class="cabecalho">
    <img src="../assets/logo.png" alt="Logo FDD" class="logo">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/cursos">Cursos</router-link>
      <span>Comunidade</span> <router-link to="/login">Login</router-link>
      <button class="botao-cadastro">Cadastre-se</button> </nav>
  </div>
</template>

<script>
export default {
  name: 'CabecalhoComponente'
}
</script>

<style scoped>
.cabecalho {
  /* ... (estilos do cabeçalho continuam os mesmos) ... */
  width: 100%;
  background-color: #fff;
  padding: 15px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  box-sizing: border-box;
}

.logo {
  height: 40px;
}

/* Ajuste para router-link e span */
.cabecalho nav a, .cabecalho nav span {
  margin: 0 15px;
  cursor: pointer;
  color: #555;
  text-decoration: none; /* Tirar sublinhado do link */
}

.cabecalho nav a:hover, .cabecalho nav span:hover {
  color: #007bff;
}

/* Estilo para o link ativo (página atual) */
.cabecalho nav a.router-link-exact-active {
  color: #007bff;
  font-weight: bold;
}

.botao-cadastro {
  /* ... (estilos do botão continuam os mesmos) ... */
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.botao-cadastro:hover {
  background-color: #0056b3;
}
</style>