<script setup lang="ts">
import type { ServicePageBase } from "@/types/service";
import type { ArticleMeta } from "@/types/article";
import { useBreadcrumbNavigation } from "@/composables/useBreadcrumbNavigation";
import BreadcrumbNav from "../ui/BreadcrumbNav.vue";
import ServiceSection from "../ui/ServiceSection.vue";
import CTASection from "../ui/CTASection.vue";
import CTAForm from "../ui/CTAForm.vue";
import FeaturedArticleCard from "../cards/FeaturedArticleCard.vue";

interface Props {
  page: ServicePageBase;
  /** Service name preselected in the hero contact form */
  serviceName: string;
  formTitle?: string;
  featuredArticle?: ArticleMeta;
}

withDefaults(defineProps<Props>(), {
  formTitle: "Request Information",
  featuredArticle: undefined,
});

const { handleBreadcrumbNavigate } = useBreadcrumbNavigation();
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] pt-16">
    <BreadcrumbNav
      :items="page.breadcrumbs"
      @navigate="handleBreadcrumbNavigate"
    />

    <ServiceSection
      variant="hero"
      :title="page.hero.title"
      :subtitle="page.hero.subtitle"
      :color-scheme="page.hero.colorScheme"
    >
      <template v-if="$slots.badge" #badge>
        <slot name="badge" />
      </template>
      <template v-if="featuredArticle" #action>
        <FeaturedArticleCard :article="featuredArticle" />
      </template>
      <CTAForm
        :service-name="serviceName"
        :form-title="formTitle"
        variant="dark"
      />
    </ServiceSection>

    <!-- Page-specific sections -->
    <slot />

    <ServiceSection
      variant="portfolio"
      :title="page.portfolio.title"
      :items="page.portfolio.items"
      :testimonial="page.portfolio.testimonial"
      color-scheme="cyan"
    />

    <CTASection
      :title="page.cta.title"
      :subtitle="page.cta.subtitle"
      :button-text="page.cta.buttonText"
    />
  </div>
</template>
