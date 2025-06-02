<template>
  <div class="pagina-cadastro">
    <h2>Cadastre-se</h2>
    <form @submit.prevent="fazerCadastro" class="formulario" v-if="!cadastroSucesso">
      <div v-if="mensagemErro" class="mensagem-erro">
        {{ mensagemErro }}
      </div>
      <div v-if="carregando" class="mensagem-carregando">
        Enviando seus dados para o amigo escondido...
      </div>

      <div class="campo-form">
        <label for="nome">Nome Completo:</label>
        <input type="text" id="nome" v-model="formulario.nome" required :disabled="carregando">
      </div>
      <div class="campo-form">
        <label for="email-cadastro">Email:</label>
        <input type="email" id="email-cadastro" v-model="formulario.email" required :disabled="carregando">
      </div>
      <div class="campo-form">
        <label for="senha-cadastro">Senha:</label>
        <input type="password" id="senha-cadastro" v-model="formulario.senha" required :disabled="carregando">
      </div>
      <div class="campo-form">
        <label for="senha-confirmar">Confirmar Senha:</label>
        <input type="password" id="senha-confirmar" v-model="formulario.confirmarSenha" required :disabled="carregando">
      </div>
      <button type="submit" class="botao-cadastrar" :disabled="carregando">
        <span v-if="carregando">Aguarde...</span>
        <span v-else>Criar Conta</span>
      </button>
    </form>
    <div v-if="cadastroSucesso" class="mensagem-sucesso">
      <p>Oba! Seu cadastro foi feito com sucesso, {{ nomeCadastrado }}!</p>
      <p>Agora você já pode fazer o login.</p>
      <button @click="irParaLogin" class="botao-ir-login">Ir para Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Nosso carteiro mágico!

export default {
  name: 'CadastroPage',
  data() {
    return {
      formulario: {
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
      },
      carregando: false,
      mensagemErro: null,
      cadastroSucesso: false,
      nomeCadastrado: ''
    }
  },
  methods: {
    async fazerCadastro() {
      if (this.formulario.senha !== this.formulario.confirmarSenha) {
        this.mensagemErro = 'As senhas não são iguais! Tente de novo.';
        return;
      }

      this.carregando = true;
      this.mensagemErro = null;
      this.cadastroSucesso = false;

      try {
        // O endereço do amigo escondido para registrar um novo usuário
        // Lembra? O backend precisa estar rodando! (ex: node app.js ou npm start na pasta do backend)
        // E o endereço http://localhost:3000 deve ser onde seu backend está.
        const enderecoDoAmigoBackend = 'http://localhost:3000/api/users/register';

        // Mandando a cartinha (POST) para o amigo com os dados do formulário
        const resposta = await axios.post(enderecoDoAmigoBackend, {
          name: this.formulario.nome,
          email: this.formulario.email,
          password: this.formulario.senha
        });

        // Se o amigo respondeu que deu tudo certo...
        console.log('Resposta do amigo (cadastro):', resposta.data);
        this.nomeCadastrado = this.formulario.nome; // Ou resposta.data.user.name se o backend retornar o nome
        this.cadastroSucesso = true;
        // Limpar o formulário (opcional, já que vamos mostrar a mensagem de sucesso)
        this.formulario.nome = '';
        this.formulario.email = '';
        this.formulario.senha = '';
        this.formulario.confirmarSenha = '';

      } catch (erro) {
        // Se o amigo respondeu que deu algo errado...
        console.error('Erro ao cadastrar:', erro.response ? erro.response.data : erro.message);
        if (erro.response && erro.response.data && erro.response.data.message) {
          this.mensagemErro = erro.response.data.message;
        } else if (erro.response && erro.response.status === 409) { // 409 Conflict é comum para email já existente
            this.mensagemErro = 'Este email já foi cadastrado. Tente outro ou faça login.';
        }
        else {
          this.mensagemErro = 'Ops! Algo deu errado ao tentar criar sua conta. Tente de novo mais tarde.';
        }
      } finally {
        // Independentemente de sucesso ou erro, paramos de mostrar "carregando"
        this.carregando = false;
      }
    },
    irParaLogin() {
      this.$router.push('/login'); // Manda para o cômodo de Login
    }
  }
}
</script>

<style scoped>
.pagina-cadastro {
  width: 90%; max-width: 450px; margin: 40px auto; padding: 30px;
  background-color: #fff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
}
.pagina-cadastro h2 { margin-bottom: 25px; color: #333; }
.formulario .campo-form { margin-bottom: 20px; text-align: left; }
.formulario label { display: block; margin-bottom: 8px; font-weight: bold; color: #555; }
.formulario input {
  width: 100%; padding: 12px; box-sizing: border-box;
  border: 1px solid #ccc; border-radius: 4px; font-size: 1em;
}
.formulario input:focus { border-color: #007bff; outline: none; box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25); }
.botao-cadastrar, .botao-ir-login {
  background-color: #28a745; color: white; border: none; padding: 12px 25px;
  border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 1.1em;
  transition: background-color 0.2s ease; display: inline-block; text-decoration: none;
}
.botao-cadastrar:hover, .botao-ir-login:hover { background-color: #1e7e34; }
.botao-cadastrar:disabled { background-color: #aaa; cursor: not-allowed; }

.mensagem-erro {
  background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;
  padding: 10px; border-radius: 5px; margin-bottom: 20px;
}
.mensagem-sucesso {
  background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;
  padding: 15px; border-radius: 5px;
}
.mensagem-sucesso p { margin: 10px 0; }
.mensagem-carregando {
    padding: 10px; color: #555; margin-bottom: 15px;
}
</style>