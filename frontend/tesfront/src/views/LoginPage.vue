<template>
  <div class="pagina-login">
    <h2>Login</h2>
    <form @submit.prevent="fazerLogin" class="formulario" v-if="!loginSucesso">
      <div v-if="mensagemErro" class="mensagem mensagem-erro">
        {{ mensagemErro }}
      </div>
      <div v-if="carregando" class="mensagem mensagem-carregando">
        Entrando...
      </div>

      <div class="campo-form">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formulario.email" required :disabled="carregando">
      </div>
      <div class="campo-form">
        <label for="senha">Senha:</label>
        <input type="password" id="senha" v-model="formulario.senha" required :disabled="carregando">
      </div>
      <button type="submit" class="botao-entrar" :disabled="carregando">
        <span v-if="carregando">Aguarde...</span>
        <span v-else>Entrar</span>
      </button>
    </form>
    <div v-if="loginSucesso" class="mensagem mensagem-sucesso">
      <p>Oba! Login feito com sucesso, {{ nomeUsuario }}!</p>
      <p>Você será redirecionado em instantes...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      formulario: {
        email: '',
        senha: ''
      },
      carregando: false,
      mensagemErro: null,
      loginSucesso: false,
      nomeUsuario: ''
    };
  },
  methods: {
    async fazerLogin() {
      this.carregando = true;
      this.mensagemErro = null;
      this.loginSucesso = false;

      try {
        // Endereço do amigo escondido para fazer login
        const enderecoDoAmigoBackend = 'http://localhost:3000/api/auth/login'; // Verifique este endereço!

        const resposta = await axios.post(enderecoDoAmigoBackend, {
          email: this.formulario.email,
          password: this.formulario.senha
        });

        // Se o amigo respondeu que deu tudo certo...
        console.log('Resposta do amigo (login):', resposta.data);

        // Guardamos a "chave mágica" (token) e os dados do usuário no "bolso" do navegador (localStorage)
        localStorage.setItem('userToken', resposta.data.token);
        localStorage.setItem('userData', JSON.stringify(resposta.data.user)); // Guardamos os dados do usuário também

        this.nomeUsuario = resposta.data.user.name; // Para mostrar na mensagem de sucesso
        this.loginSucesso = true;

        // Limpar o formulário
        this.formulario.email = '';
        this.formulario.senha = '';

        // Avisamos o App.vue (ou quem precisar saber) que o login foi feito
        // (Isso pode ser feito de forma mais chique com Vuex/Pinia, mas por agora vamos simplificar)
        // Disparar um evento global ou usar um pequeno "store" reativo seria um próximo passo aqui.
        // Por enquanto, vamos apenas redirecionar.

        // Manda para o cômodo dos cursos depois de um tempinho
        setTimeout(() => {
          this.$router.push('/cursos');
        }, 2000); // Espera 2 segundos antes de redirecionar

      } catch (erro) {
        console.error('Erro ao fazer login:', erro.response ? erro.response.data : erro.message);
        if (erro.response && erro.response.data && erro.response.data.message) {
          this.mensagemErro = erro.response.data.message;
        } else if (erro.response && erro.response.status === 401) { // 401 Unauthorized
            this.mensagemErro = 'Email ou senha incorretos. Tente novamente!';
        }
        else {
          this.mensagemErro = 'Ops! Algo deu errado ao tentar fazer login. Tente de novo mais tarde.';
        }
      } finally {
        this.carregando = false;
      }
    }
  }
}
</script>

<style scoped>
.pagina-login {
  width: 90%; max-width: 400px; margin: 40px auto; padding: 30px;
  background-color: #fff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
}
.pagina-login h2 { margin-bottom: 25px; color: #333; }
.formulario .campo-form { margin-bottom: 20px; text-align: left; }
.formulario label { display: block; margin-bottom: 8px; font-weight: bold; color: #555; }
.formulario input {
  width: 100%; padding: 12px; box-sizing: border-box;
  border: 1px solid #ccc; border-radius: 4px; font-size: 1em;
}
.formulario input:focus { border-color: #007bff; outline: none; box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25); }
.botao-entrar {
  background-color: #007bff; color: white; border: none; padding: 12px 25px;
  border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 1.1em;
  transition: background-color 0.2s ease;
}
.botao-entrar:hover { background-color: #0056b3; }
.botao-entrar:disabled { background-color: #aaa; cursor: not-allowed; }

.mensagem { padding: 10px; border-radius: 5px; margin-bottom: 20px; }
.mensagem-erro { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
.mensagem-sucesso { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
.mensagem-sucesso p { margin: 10px 0; }
.mensagem-carregando { color: #555; }
</style>