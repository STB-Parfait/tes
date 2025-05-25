<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-links">
        <a
          v-for="link in footerLinks"
          :key="link.text"
          :href="link.url"
          @click="handleLinkClick"
        >
          {{ link.text }}
        </a>
      </div>
      <p class="copyright">© 2025 Learn FDD. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      footerLinks: [
        { text: "Política de Privacidade", url: "/politica-privacidade" },
        { text: "Termos de Uso", url: "/termos-uso" },
        { text: "Contato", url: "/contato" },
        { text: "Sobre Nós", url: "/sobre" },
      ],
    };
  },
  methods: {
    handleLinkClick(e) {
      e.preventDefault();
      console.log("Link clicado:", e.target.textContent);
      // Aqui você pode adicionar lógica para navegar ou mostrar modais
    },
  },
};
</script>

<style scoped>
.footer {
  background-color: var(--dark);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.footer-links a {
  color: white;
  margin: 0 1rem;
  text-decoration: none;
  transition: opacity 0.3s;
}

.footer-links a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.copyright {
  font-size: 0.9rem;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .footer-links {
    flex-direction: column;
    gap: 1rem;
  }

  .footer-links a {
    margin: 0;
  }
}
</style>
