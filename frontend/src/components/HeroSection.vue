<template>
  <section class="hero">
    <div class="container">
      <h1>Domine Feature Driven Development e acelere suas entregas</h1>
      <p>
        Aprenda a metodologia que está transformando equipes de desenvolvimento
        em todo o mundo. Entregue software com maior qualidade, previsibilidade
        e velocidade.
      </p>
      <a href="#pricing" @click="scrollToPricing" class="btn-primary"
        >QUERO COMEÇAR AGORA</a
      >
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  methods: {
    scrollToPricing(e) {
      e.preventDefault();
      const pricingSection = document.getElementById("pricing");
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>

<style scoped>
.hero {
  padding: 4rem 0;
  text-align: center;
  background-color: var(--dark);
  position: relative;
  color: white;
}

.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.hero .container {
  position: relative;
  z-index: 2;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.hero p {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.2rem;
  }

  .hero p {
    font-size: 1rem;
  }
}
</style>
