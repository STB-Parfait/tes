<template>
  <section id="pricing" class="pricing">
    <div class="container">
      <h2>Invista em sua carreira hoje</h2>
      <p class="pricing-subtitle">
        Aprenda uma das metodologias mais eficientes para desenvolvimento de
        software e destaque-se no mercado
      </p>

      <div class="price-card">
        <h3>Curso Completo de FDD</h3>
        <div class="price-value">R$497</div>
        <p class="price-description">
          Acesso vitalício a todo o conteúdo do curso
        </p>

        <ul class="price-features">
          <li v-for="(feature, index) in features" :key="index">
            {{ feature }}
          </li>
        </ul>

        <button @click="handleSubscription" class="btn-primary">
          QUERO ME INSCREVER
        </button>

        <div class="guarantee">
          <div class="guarantee-icon">🔒</div>
          <p>Garantia de 30 dias de satisfação ou seu dinheiro de volta</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PricingSection",
  emits: ["open-login"],
  data() {
    return {
      features: [
        "40 horas de conteúdo em vídeo",
        "Material complementar para download",
        "6 projetos práticos com código-fonte",
        "Certificado de conclusão",
        "Comunidade exclusiva de alunos",
        "Suporte por 12 meses",
        "2 mentorias individuais",
      ],
    };
  },
  methods: {
    handleSubscription() {
      this.$emit("open-login");
    },
  },
};
</script>

<style scoped>
.pricing {
  padding: 4rem 0;
  text-align: center;
}

.pricing h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.pricing-subtitle {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.price-card {
  background-color: white;
  padding: 3rem 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

.price-card:hover {
  transform: translateY(-5px);
}

.price-value {
  font-size: 3.5rem;
  font-weight: bold;
  color: var(--primary);
  margin-bottom: 1rem;
}

.price-description {
  margin-bottom: 2rem;
}

.price-features {
  text-align: left;
  margin-bottom: 2rem;
  list-style-type: none;
}

.price-features li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.price-features li::before {
  content: "✓";
  color: var(--secondary);
  position: absolute;
  left: 0;
  font-weight: bold;
}

.guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  padding: 1rem;
  background-color: rgba(46, 204, 113, 0.1);
  border-radius: 10px;
}

.guarantee-icon {
  font-size: 2rem;
  color: var(--secondary);
  margin-right: 1rem;
}
</style>
