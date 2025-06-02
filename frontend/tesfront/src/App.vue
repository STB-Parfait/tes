<template>
  <div id="app">
    <CabecalhoComponente />

    <div class="secao-principal">
      <h1>Aprenda FDD e garanta o seu futuro</h1>
      <p>Descubra como a metodologia FDD pode transformar sua carreira.</p>
      <button class="botao-aprender">Quero aprender FDD</button>
    </div>

    <div class="secao-por-que">
      <h2>Por que aprender FDD?</h2>
      <div class="cards-container">
        <div class="card">
          <img src="./assets/icon1.png" alt="Ícone Benefício 1" class="card-icone">
          <h3>Benefício 1</h3>
          <p>Texto explicando o benefício 1 de forma simples.</p>
        </div>
        <div class="card">
          <img src="./assets/icon2.png" alt="Ícone Benefício 2" class="card-icone">
          <h3>Benefício 2</h3>
          <p>Texto explicando o benefício 2 de forma simples.</p>
        </div>
        <div class="card">
          <img src="./assets/icon3.png" alt="Ícone Benefício 3" class="card-icone">
          <h3>Benefício 3</h3>
          <p>Texto explicando o benefício 3 de forma simples.</p>
        </div>
      </div>
    </div>

    <div class="secao-cursos">
      <h2>Nossos Cursos</h2>
      <div v-if="cursos.length === 0">
        <p>Carregando cursos do amigo escondido...</p>
      </div>
      <ul v-else>
        <li v-for="curso in cursos" :key="curso.id">
          <h3>{{ curso.title }}</h3>
          <p>{{ curso.description }}</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import CabecalhoComponente from './components/CabecalhoComponente.vue'; // Importando o bloco de montar do cabeçalho

export default {
  name: 'App',
  components: {
    CabecalhoComponente // Registrando o bloco de montar para usá-lo no <template>
  },
  data() {
    return {
      cursos: [] // Um lugar para guardar a lista de cursos que o amigo vai mandar
    }
  },
  methods: {
    buscarCursos() {
      // Este é o endereço do nosso amigo escondido (backend)
      // IMPORTANTE: Você vai precisar rodar o backend que você tem em outra janelinha preta!
      // E o endereço aqui pode ser diferente, dependendo de como o backend está configurado.
      // Por exemplo, se o backend está rodando na porta 3000:
      const enderecoDoAmigoBackend = 'http://localhost:3000/api/courses'; // Verifique este endereço!

      axios.get(enderecoDoAmigoBackend)
        .then(resposta => {
          // Oba! O amigo respondeu!
          console.log('Cursos recebidos:', resposta.data);
          this.cursos = resposta.data; // Guardamos os cursos na nossa "caixinha"
        })
        .catch(erro => {
          // Xi... deu algum problema para falar com o amigo
          console.error('Erro ao buscar cursos:', erro);
          // Poderíamos mostrar uma mensagem triste na tela
          this.cursos = []; // Limpa os cursos em caso de erro para não mostrar dados antigos
        });
    }
  },
  mounted() {
    // Assim que a casinha estiver pronta e montada, ela vai chamar o amigo para buscar os cursos
    this.buscarCursos();
  }
}
</script>

<style>
/* Estilos Globais da Casinha e das Seções */
body {
  margin: 0;
  font-family: sans-serif;
  background-color: #f0f2f5; /* Cor de fundo geral parecida com a imagem */
  color: #333;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Estilos do Cabeçalho (movidos para CabecalhoComponente.vue se usar <style scoped> lá,
   mas aqui estão como globais se o CabecalhoComponente não tiver seus próprios estilos scoped) */
.cabecalho {
  width: 100%;
  background-color: #fff; /* Cabeçalho branco */
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

.cabecalho nav span, .cabecalho nav a { /* Estilizando spans e router-links se forem usados */
  margin: 0 15px;
  cursor: pointer;
  color: #555;
  text-decoration: none;
}

.cabecalho nav span:hover, .cabecalho nav a:hover {
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

/* Estilos da Seção Principal */
.secao-principal {
  width: 100%;
  background-color: #2c3e50; /* Cor escura de fundo */
  color: white;
  text-align: center;
  padding: 80px 20px;
  box-sizing: border-box;
}

.secao-principal h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.secao-principal p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.botao-aprender {
  background-color: #ffc107; /* Amarelo */
  color: #333;
  border: none;
  padding: 15px 30px;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.botao-aprender:hover {
  background-color: #e0a800;
}

/* Estilos da Seção "Por que aprender FDD?" */
.secao-por-que {
  width: 80%;
  max-width: 1200px;
  margin: 40px auto;
  text-align: center;
  padding: 20px;
}

.secao-por-que h2 {
  font-size: 2em;
  margin-bottom: 40px;
  color: #333;
}

.cards-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap; /* Para quebrar em telas menores */
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 30%;
  min-width: 280px; /* Para não ficar muito pequeno */
  padding: 20px;
  margin: 15px;
  box-sizing: border-box;
}

.card-icone {
  width: 50px; /* Ajuste o tamanho conforme necessário */
  height: 50px;
  margin-bottom: 15px;
}

.card h3 {
  color: #007bff;
  margin-bottom: 10px;
}

.card p {
  font-size: 0.9em;
  color: #555;
}

/* Estilos da Seção de Cursos */
.secao-cursos {
  width: 80%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.secao-cursos h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.secao-cursos ul {
  list-style: none;
  padding: 0;
}

.secao-cursos li {
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>