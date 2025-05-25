<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="$emit('close')">×</button>

      <div class="auth-header">
        <h2>Criar sua conta</h2>
        <p>Junte-se aos milhares de desenvolvedores que já dominam FDD</p>
      </div>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="name">Nome completo</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Seu nome completo"
            required
          />
        </div>

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
            placeholder="Mínimo 6 caracteres"
            required
            minlength="6"
          />
        </div>

        <div class="form-group">
          <label for="role">Tipo de conta</label>
          <select id="role" v-model="role" required>
            <option value="">Selecione o tipo</option>
            <option value="student">Estudante</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" v-model="acceptTerms" required />
            <span>Aceito os termos de uso</span>
          </label>
        </div>

        <button
          type="submit"
          class="btn-submit"
          :disabled="!acceptTerms || isLoading"
        >
          {{ isLoading ? "Criando conta..." : "Criar conta" }}
        </button>
      </form>

      <div class="auth-footer">
        <p>
          Já tem uma conta?
          <button
            type="button"
            @click="$emit('switch-to-login')"
            class="switch-link"
          >
            Fazer login
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth_store";

export default {
  name: "RegisterModal",
  emits: ["close", "switch-to-login"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      role: "",
      acceptTerms: false,
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
    async handleRegister() {
      if (!this.acceptTerms) {
        alert("Você deve aceitar os termos de uso");
        return;
      }

      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
      };

      const result = await this.authStore.register(userData);

      if (result.success) {
        alert(`Conta criada com sucesso para: ${this.name}`);
        this.$emit("close");
      } else {
        alert(`Erro ao criar conta: ${result.message}`);
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
  max-width: 420px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
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

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: #2c3e50;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #2ecc71;
}

.form-group input::placeholder {
  color: #999;
}

.form-options {
  margin-bottom: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  color: #2c3e50;
}

.checkbox-label input {
  margin-right: 0.5rem;
  width: auto;
}

.checkbox-label span {
  color: #2c3e50;
}

.btn-submit {
  width: 100%;
  background-color: var(--secondary);
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
  background-color: #27ae60;
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
  color: var(--secondary);
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}
</style>
