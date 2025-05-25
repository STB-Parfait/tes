<template>
  <header>
    <div class="container">
      <div class="header-content">
        <div class="logo">Learn FDD</div>
        <p class="tagline">
          Transforme seu desenvolvimento de software com Feature Driven
          Development
        </p>

        <div class="auth-buttons">
          <button @click="showLogin" class="btn-login">Entrar</button>
          <button @click="showRegister" class="btn-register">
            Criar conta
          </button>
        </div>
      </div>
    </div>

    <!-- Modais de Autenticação -->
    <LoginModal
      v-if="showLoginModal"
      @close="closeModals"
      @switch-to-register="switchToRegister"
    />

    <RegisterModal
      v-if="showRegisterModal"
      @close="closeModals"
      @switch-to-login="switchToLogin"
    />
  </header>
</template>

<script>
import LoginModal from "./LoginModal.vue";
import RegisterModal from "./RegisterModal.vue";

export default {
  name: "Header",
  components: {
    LoginModal,
    RegisterModal,
  },
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false,
    };
  },
  methods: {
    showLogin() {
      this.showLoginModal = true;
      this.showRegisterModal = false;
    },

    showRegister() {
      this.showRegisterModal = true;
      this.showLoginModal = false;
    },

    switchToRegister() {
      this.showLoginModal = false;
      this.showRegisterModal = true;
    },

    switchToLogin() {
      this.showRegisterModal = false;
      this.showLoginModal = true;
    },

    closeModals() {
      this.showLoginModal = false;
      this.showRegisterModal = false;
    },
  },
};
</script>

<style scoped>
header {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 1.5rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 2.5rem;
  font-weight: bold;
}

.tagline {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
  max-width: 400px;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

.btn-login,
.btn-register {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-login {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-login:hover {
  background: white;
  color: var(--primary);
}

.btn-register {
  background: white;
  color: var(--primary);
}

.btn-register:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .tagline {
    display: none;
  }

  .auth-buttons {
    width: 100%;
    justify-content: center;
  }
}
</style>
