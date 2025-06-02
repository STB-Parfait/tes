<template>
  <div class="cabecalho">
    <img src="../assets/logo.png" alt="Logo FDD" class="logo">
    <nav>
      <span>Home</span>
      <span>Cursos</span>
      <span>Comunidade</span>
      <span>Login</span>
      <button class="botao-cadastro">Cadastre-se</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'CabecalhoComponente'
  // Se o nosso bloco precisasse de alguma mágica especial só pra ele,
  // a gente colocaria aqui!
}
</script>

<style scoped>
/* "scoped" quer dizer que essas cores só funcionam para este bloco aqui! */
.cabecalho {
  width: 100%;
  background-color: #fff; /* Cabeçalho branco */
  padding: 15px 5%; /* Ajuste o padding para alinhar com o App.vue */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  box-sizing: border-box; /* Importante para o padding não aumentar o tamanho total */
}

.logo {
  height: 40px;
}

.cabecalho nav span {
  margin: 0 15px;
  cursor: pointer;
  color: #555;
}

.cabecalho nav span:hover {
  color: #007bff; /* Cor azul para hover */
}

.botao-cadastro {
  background-color: #007bff; /* Azul */
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