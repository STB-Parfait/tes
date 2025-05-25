<template>
  <section class="faq">
    <div class="container">
      <h2>Perguntas Frequentes</h2>

      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <p class="faq-question" @click="toggleFAQ(index)">
          {{ faq.question }}
          <span class="faq-toggle">{{ faq.expanded ? "−" : "+" }}</span>
        </p>
        <transition name="fade">
          <p v-if="faq.expanded" class="faq-answer">{{ faq.answer }}</p>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FAQSection",
  data() {
    return {
      faqs: [
        {
          question: "O que é Feature Driven Development (FDD)?",
          answer:
            "FDD é uma metodologia ágil de desenvolvimento de software que organiza o trabalho em torno da entrega de funcionalidades específicas. Foi desenvolvida por Jeff De Luca e Peter Coad no final dos anos 90 e combina as melhores práticas de engenharia de software com uma abordagem orientada a features.",
          expanded: false,
        },
        {
          question: "Esse curso é para mim?",
          answer:
            "O curso é ideal para desenvolvedores, tech leads, gerentes de projeto, scrum masters e qualquer profissional envolvido no processo de desenvolvimento de software que deseja aprender uma metodologia eficaz para organizar e gerenciar o trabalho da equipe.",
          expanded: false,
        },
        {
          question: "Preciso de conhecimentos prévios para acompanhar o curso?",
          answer:
            "É recomendável ter conhecimentos básicos em desenvolvimento de software, mas não é necessário conhecimento prévio em metodologias ágeis. O curso aborda todos os conceitos desde o início, tornando-o acessível para diferentes níveis de experiência.",
          expanded: false,
        },
        {
          question:
            "Como o FDD se compara com outras metodologias ágeis como Scrum?",
          answer:
            "O FDD complementa muito bem outras metodologias como Scrum e Kanban. Enquanto o Scrum foca na organização e gestão do time, o FDD traz práticas específicas para o desenvolvimento, modelagem e gerenciamento técnico do projeto. No curso, você aprenderá como integrar o FDD com outras práticas ágeis que você já possa estar utilizando.",
          expanded: false,
        },
        {
          question: "Quanto tempo tenho acesso ao curso?",
          answer:
            "O acesso ao curso é vitalício! Uma vez inscrito, você poderá acessar o conteúdo sempre que quiser, incluindo atualizações futuras que serão feitas no material.",
          expanded: false,
        },
      ],
    };
  },
  methods: {
    toggleFAQ(index) {
      this.faqs[index].expanded = !this.faqs[index].expanded;
    },
  },
};
</script>

<style scoped>
.faq {
  background-color: white;
  padding: 4rem 0;
}

.faq h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.faq-item {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1.5rem;
}

.faq-question {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question:hover {
  opacity: 0.8;
}

.faq-toggle {
  font-size: 1.5rem;
  margin-left: 1rem;
}

.faq-answer {
  line-height: 1.6;
  margin-top: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
