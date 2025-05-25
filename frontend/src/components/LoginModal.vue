<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="$emit('close')">×</button>

      <div class="auth-header">
        <h2>Entrar na sua conta</h2>
        <p>Acesse o melhor curso de Feature Driven Development</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="seu@email.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Sua senha"
            required
          />
        </div>

        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" v-model="rememberMe" />
            <span>Lembrar de mim</span>
          </label>
          <a href="#" class="forgot-link">Esqueceu a senha?</a>
        </div>

        <button type="submit" class="btn-submit" :disabled="isLoading">
          {{ isLoading ? "Entrando..." : "Entrar" }}
        </button>
      </form>

      <div class="auth-footer">
        <p>
          Não tem uma conta?
          <button
            type="button"
            @click="$emit('switch-to-register')"
            class="switch-link"
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth_store";

export default {
  name: "LoginModal",
  emits: ["close", "switch-to-register", "login-success"],
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  computed: {
    isLoading() {
      return this.authStore.isLoading;
    },
  },
  methods: {
    async handleLogin() {
      const credentials = {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe,
      };

      const result = await this.authStore.login(credentials);

      if (result.success) {
        alert(`Bem-vindo, ${result.data.user?.name || this.email}!`);
        this.$emit("login-success", result.data);
        this.$emit("close");
      } else {
        alert(`Erro no login: ${result.message}`);
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  position: relative;
  border-radius: 15px;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background-color: #f5f5f5;
  color: #333;
}

.auth-header {
  margin-bottom: 1.5rem;
}

.auth-header h2 {
  color: var(--dark);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.auth-header p {
  color: #666;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--dark);
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: #2c3e50;
}

.form-group input:focus {
  outline: none;
  border-color: #3498db;
}

.form-group input::placeholder {
  color: #999;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #2c3e50;
}

.checkbox-label input {
  margin-right: 0.5rem;
  width: auto;
}

.checkbox-label span {
  color: #2c3e50;
}

.forgot-link {
  color: var(--primary);
  text-decoration: none;
}

.btn-submit {
  width: 100%;
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease;
}

.btn-submit:hover:not(:disabled) {
  background-color: #2980b9;
}

.btn-submit:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
.auth-footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.auth-footer p {
  color: #2c3e50;
}

.switch-link {
  color: var(--primary);
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}
</style>
