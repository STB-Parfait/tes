<template>
  <div class="pagina-cursos">
    <h2>Nossos Cursos</h2>
    <div v-if="carregando">
      <p>Carregando cursos do amigo escondido...</p>
    </div>
    <div v-else-if="cursos.length === 0">
        <p>Nenhum curso encontrado por enquanto. O amigo escondido está descansando!</p>
    </div>
    <ul v-else>
      <li v-for="curso in cursos" :key="curso.id">
        <h3>{{ curso.title }}</h3>
        <p>{{ curso.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CursosPage',
  data() {
    return {
      cursos: [],
      carregando: true
    }
  },
  methods: {
    buscarCursos() {
      this.carregando = true;
      const enderecoDoAmigoBackend = 'http://localhost:3000/api/courses'; // Lembre-se de verificar este endereço!
      axios.get(enderecoDoAmigoBackend)
        .then(resposta => {
          this.cursos = resposta.data;
          this.carregando = false;
        })
        .catch(erro => {
          console.error('Erro ao buscar cursos:', erro);
          this.carregando = false;
          // Você pode adicionar uma mensagem de erro aqui para o usuário
        });
    }
  },
  mounted() {
    this.buscarCursos();
  }
}
</script>

<style scoped>
.pagina-cursos {
  width: 80%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.pagina-cursos h2 {
  color: #333;
  margin-bottom: 20px;
}

.pagina-cursos ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

.pagina-cursos li {
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>