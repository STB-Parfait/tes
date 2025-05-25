<template>
  <section class="features">
    <div class="container">
      <h2>Por que aprender FDD?</h2>
      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index" 
          class="feature-card"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesSection',
  data() {
    return {
      features: [
        {
          icon: '🚀',
          title: 'Entregas Rápidas',
          description: 'Aumente a velocidade de entrega mantendo alta qualidade com o desenvolvimento orientado a features.'
        },
        {
          icon: '🔍',
          title: 'Visibilidade Total',
          description: 'Obtenha visibilidade precisa do progresso do projeto e previsibilidade nas entregas.'
        },
        {
          icon: '🛠️',
          title: 'Escalabilidade',
          description: 'Metodologia que se adapta desde pequenas equipes até grandes projetos corporativos.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.features {
  background-color: white;
  padding: 4rem 0;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: var(--light);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--primary);
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: var(--dark);
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>