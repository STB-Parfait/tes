// frontend/src/stores/auth_store.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  }),

  getters: {
    getUserData: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
    getUserRole: (state) => state.user?.role || null,
    isAdmin: (state) => state.user?.role === "admin",
    isStudent: (state) => state.user?.role === "student",
  },

  actions: {
    // Buscar dados do usuário pelo token
    async fetchUserByToken() {
      if (!this.token) {
        console.warn("Nenhum token disponível para buscar usuário");
        return { success: false, message: "Token não encontrado" };
      }

      try {
        const response = await this.authenticatedRequest(
          "http://localhost:3000/auth/me"
        );

        if (response.ok) {
          const userData = await response.json();

          // Atualizar dados do usuário no store
          this.user = userData;
          this.isAuthenticated = true;

          // Atualizar no storage também
          const storage = localStorage.getItem("authToken")
            ? localStorage
            : sessionStorage;
          storage.setItem("userData", JSON.stringify(userData));

          return { success: true, data: userData };
        } else {
          const error = await response.json();
          return {
            success: false,
            message: error.message || "Erro ao buscar dados do usuário",
          };
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return { success: false, message: "Erro ao conectar com o servidor" };
      }
    },

    // Inicializar o store verificando o storage
    async initAuth() {
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      const userData =
        localStorage.getItem("userData") || sessionStorage.getItem("userData");

      if (token) {
        this.token = token;

        if (userData) {
          // Se tem dados salvos, usar eles
          this.user = JSON.parse(userData);
          this.isAuthenticated = true;
        } else {
          // Se não tem dados do usuário, buscar pelo token
          await this.fetchUserByToken();
        }
      }
    },

    // Fazer login
    async login(credentials) {
      this.isLoading = true;

      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (response.ok) {
          const result = await response.json();

          // Salvar no store
          this.token = result.token;
          this.user = result.user;
          this.isAuthenticated = true;

          // Salvar no storage
          const storage = credentials.rememberMe
            ? localStorage
            : sessionStorage;
          storage.setItem("authToken", result.token);
          storage.setItem("userData", JSON.stringify(result.user));

          return { success: true, data: result };
        } else {
          const error = await response.json();
          return {
            success: false,
            message: error.message || "Credenciais inválidas",
          };
        }
      } catch (error) {
        console.error("Erro na requisição de login:", error);
        return { success: false, message: "Erro ao conectar com o servidor" };
      } finally {
        this.isLoading = false;
      }
    },

    // Fazer registro
    async register(userData) {
      this.isLoading = true;

      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const result = await response.json();
          return { success: true, data: result };
        } else {
          const error = await response.json();
          return {
            success: false,
            message: error.message || "Erro ao criar conta",
          };
        }
      } catch (error) {
        console.error("Erro na requisição de registro:", error);
        return { success: false, message: "Erro ao conectar com o servidor" };
      } finally {
        this.isLoading = false;
      }
    },

    // Fazer logout
    async logout() {
      try {
        if (this.token) {
          // Tentar fazer logout no servidor
          await fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-Type": "application/json",
            },
          });
        }
      } catch (error) {
        console.error("Erro no logout do servidor:", error);
      } finally {
        // Sempre limpar dados locais
        this.clearAuthData();
      }
    },

    // Limpar dados de autenticação
    clearAuthData() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      // Limpar storage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userData");
    },

    // Fazer requisição autenticada
    async authenticatedRequest(url, options = {}) {
      const headers = {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Se receber 401, fazer logout
      if (response.status === 401) {
        await this.logout();
        throw new Error("Sessão expirada. Faça login novamente.");
      }

      return response;
    },

    // Verificar se o token ainda é válido
    async validateToken() {
      if (!this.token) return false;

      try {
        const response = await this.authenticatedRequest(
          "http://localhost:3000/auth/validate"
        );
        return response.ok;
      } catch (error) {
        console.error("Erro ao validar token:", error);
        return false;
      }
    },

    // Atualizar dados do usuário
    updateUser(userData) {
      this.user = { ...this.user, ...userData };

      // Atualizar no storage também
      const storage = localStorage.getItem("authToken")
        ? localStorage
        : sessionStorage;
      storage.setItem("userData", JSON.stringify(this.user));
    },
  },
});
