<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useMeta } from "../composables/useMeta";
import PrimaryRouterLink from "../components/elements/buttons/PrimaryRouterLink.vue";
import NotFoundView from "./NotFoundView.vue";
import { getArticle, articleTypeLabels } from "@/data/articles";
import { SITE } from "@/constants";

const route = useRoute();
const article = computed(() => getArticle(String(route.params.slug)));

// The view is reused when moving between articles, so update meta per slug
watch(
  article,
  (current) => {
    if (!current) return;
    useMeta({
      title: `${current.title} | I Develop Tech`,
      description: current.summary,
      ogTitle: current.title,
      ogDescription: current.summary,
      ogUrl: `${SITE.url}/notes/${current.slug}`,
      ogImage: SITE.ogImage,
    });
  },
  { immediate: true },
);
</script>

<template>
  <NotFoundView v-if="!article" />
  <main v-else class="min-h-screen pt-20 bg-[#0a0a0a] text-white">
    <article class="max-w-3xl mx-auto px-6 py-12">
      <header class="mb-12">
        <p
          class="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-4"
        >
          {{ articleTypeLabels[article.type].eyebrow }}
        </p>
        <h1
          class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
        >
          {{ article.title }}
        </h1>
        <p class="text-lg md:text-xl text-slate-400 leading-relaxed">
          {{ article.summary }}
        </p>
        <p v-if="article.updated" class="text-sm text-slate-500 mt-6">
          Updated {{ article.updated }}
        </p>
      </header>

      <div
        v-if="article.status === 'draft'"
        class="rounded-lg border border-dashed border-slate-700 p-8 text-slate-500"
      >
        <p class="text-center">Draft in progress. Article body goes here.</p>
      </div>

      <aside
        class="mt-16 rounded-xl border border-cyan-900/40 bg-linear-to-br from-cyan-950/30 to-purple-950/20 p-8"
      >
        <h2 class="text-2xl font-bold mb-3">Working on something similar?</h2>
        <p class="text-slate-300 mb-6">
          See how I approach {{ article.relatedService.label }} engagements, or
          get in touch to talk through your situation.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <PrimaryRouterLink :to="article.relatedService.path">
            {{ article.relatedService.label }}
          </PrimaryRouterLink>
          <router-link
            to="/hire-me"
            class="inline-flex items-center justify-center py-3 px-6 rounded-lg font-semibold text-sm md:text-base border border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-white transition-colors"
          >
            Get in touch
          </router-link>
        </div>
      </aside>
    </article>
  </main>
</template>
