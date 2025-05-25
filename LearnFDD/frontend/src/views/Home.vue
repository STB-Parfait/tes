<template>
  <div>
    <Header ref="header" />
    <main>
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <PricingSection @open-login="openLoginModal" />
      <FAQSection />
      <InstructorSection />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import HeroSection from "../components/HeroSection.vue";
import FeaturesSection from "../components/FeaturesSection.vue";
import BenefitsSection from "../components/BenefitsSection.vue";
import TestimonialsSection from "../components/TestimonialsSection.vue";
import PricingSection from "../components/PricingSection.vue";
import FAQSection from "../components/FAQSection.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    HeroSection,
    FeaturesSection,
    BenefitsSection,
    TestimonialsSection,
    PricingSection,
    FAQSection,
    Footer,
  },
  methods: {
    openLoginModal() {
      this.$refs.header.showLogin();
    },
  },
};
</script>
