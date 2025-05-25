<template>
  <section class="benefits">
    <div class="container">
      <h2>Benefícios do FDD em sua carreira</h2>

      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        :class="['benefit-container', { reverse: index % 2 !== 0 }]"
      >
        <div class="benefit-text">
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.description }}</p>
        </div>
        <div class="benefit-image">
          <div class="placeholder-image" :aria-label="benefit.alt"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BenefitsSection",
  data() {
    return {
      benefits: [
        {
          title: "Modelo orientado a resultados",
          description:
            "O FDD foca na entrega contínua de funcionalidades tangíveis para o cliente, garantindo que cada etapa do desenvolvimento gere valor concreto. Você aprenderá como priorizar features que impactam diretamente nos objetivos de negócio.",
          alt: "Modelo orientado a resultados",
        },
        {
          title: "Processo iterativo e incremental",
          description:
            "Descubra como aplicar ciclos de desenvolvimento curtos que permitem feedback constante e adaptação rápida às mudanças. O FDD combina as melhores práticas ágeis com foco nas funcionalidades que realmente importam.",
          alt: "Processo iterativo",
        },
        {
          title: "Modelagem de domínio eficaz",
          description:
            "Aprenda a desenvolver modelos de domínio robustos que facilitam a comunicação entre desenvolvedores e especialistas do negócio, reduzindo erros de interpretação e acelerando o desenvolvimento.",
          alt: "Modelagem de domínio",
        },
      ],
    };
  },
};
</script>

<style scoped>
.benefits {
  padding: 4rem 0;
}

.benefits h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.benefit-container {
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
}

.benefit-container.reverse {
  flex-direction: row-reverse;
}

.benefit-text {
  flex: 1;
  padding: 0 2rem;
}

.benefit-text h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--primary);
}

.benefit-image {
  flex: 1;
  text-align: center;
}

.placeholder-image {
  width: 100%;
  height: 300px;
  background-color: #ddd;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: inline-block;
}

@media (max-width: 768px) {
  .benefit-container,
  .benefit-container.reverse {
    flex-direction: column;
  }

  .benefit-text {
    padding: 0;
    margin-bottom: 2rem;
  }

  .placeholder-image {
    height: 200px;
  }
}
</style>
