<template>
  <div class="pagina-home">
    <div class="secao-principal">
      <h1>Aprenda FDD e garanta o seu futuro</h1>
      <p>Descubra como a metodologia FDD pode transformar sua carreira.</p>
      <button class="botao-aprender">Quero aprender FDD</button>
    </div>

    <div class="secao-por-que">
      <h2>Por que aprender FDD?</h2>
      <div class="cards-container">
        <div class="card">
          <img src="../assets/icon1.png" alt="Ícone Benefício 1" class="card-icone">
          <h3>Benefício 1</h3>
          <p>Texto explicando o benefício 1 de forma simples.</p>
        </div>
        <div class="card">
          <img src="../assets/icon2.png" alt="Ícone Benefício 2" class="card-icone">
          <h3>Benefício 2</h3>
          <p>Texto explicando o benefício 2 de forma simples.</p>
        </div>
        <div class="card">
          <img src="../assets/icon3.png" alt="Ícone Benefício 3" class="card-icone">
          <h3>Benefício 3</h3>
          <p>Texto explicando o benefício 3 de forma simples.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
/* Estilos que estavam em App.vue para essas seções podem vir pra cá se quiser,
   ou manter no App.vue se forem globais. Vou manter alguns no App.vue por enquanto. */
.secao-principal {
  width: 100%;
  background-color: #2c3e50;
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
  background-color: #ffc107;
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
  flex-wrap: wrap;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 30%;
  min-width: 280px;
  padding: 20px;
  margin: 15px;
  box-sizing: border-box;
}

.card-icone {
  width: 50px;
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
</style>