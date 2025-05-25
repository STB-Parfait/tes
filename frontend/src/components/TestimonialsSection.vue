<template>
  <section class="testimonials">
    <div class="container">
      <h2>O que nossos alunos dizem</h2>
      <div class="testimonials-grid">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="testimonial-card"
        >
          <p class="testimonial-text">{{ testimonial.text }}</p>
          <p class="testimonial-author">{{ testimonial.author }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TestimonialsSection",
  data() {
    return {
      testimonials: [
        {
          text: "Implementamos o FDD em nossa equipe e conseguimos reduzir o tempo de entrega em 40%. O curso foi essencial para entender a metodologia e aplicá-la corretamente.",
          author: "Paulo Ribeiro, Tech Lead",
        },
        {
          text: "Como gerente de projetos, o FDD me deu uma visibilidade muito maior sobre o progresso real do desenvolvimento. A metodologia é excelente e o curso explica tudo com muita clareza.",
          author: "Camila Santos, Project Manager",
        },
        {
          text: "O curso de FDD transformou nossa forma de trabalhar. Agora temos uma abordagem orientada a features que mantém o foco no que realmente importa para o cliente.",
          author: "Rafael Almeida, Desenvolvedor Sênior",
        },
      ],
    };
  },
};
</script>

<style scoped>
.testimonials {
  background-color: white;
  padding: 4rem 0;
  text-align: center;
}

.testimonials h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background-color: var(--light);
  padding: 2rem;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.testimonial-text {
  font-style: italic;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.testimonial-author {
  font-weight: bold;
  color: var(--primary);
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
