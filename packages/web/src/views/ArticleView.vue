<script setup lang="ts">
import { computed, defineAsyncComponent, provide, ref, watch } from "vue";
import type { Component } from "vue";
import { useRoute } from "vue-router";
import { useMeta } from "../composables/useMeta";
import { useArticleOutline } from "../composables/useArticleOutline";
import { ArrowRightIcon } from "@heroicons/vue/24/outline";
import PrimaryRouterLink from "../components/elements/buttons/PrimaryRouterLink.vue";
import NotFoundView from "./NotFoundView.vue";
import ArticleAuthor from "../components/article/ArticleAuthor.vue";
import ArticleSources from "../components/article/ArticleSources.vue";
import ArticleToc from "../components/article/ArticleToc.vue";
import { articleSourcesKey } from "../components/article/articleSources";
import { getArticle, articlePath, articleTypeLabels } from "@/data/articles";
import {
  aiAdoptionSources,
  aiAdoptionSourcesNote,
} from "@/data/articles/ai-adoption-sources";
import type { ArticleSource } from "@/types/article";
import { AUTHOR, CONTACT, SITE } from "@/constants";

const route = useRoute();
const articleEl = ref<HTMLElement | null>(null);
const { items: outline, activeId: activeSection } =
  useArticleOutline(articleEl);
const article = computed(() => getArticle(String(route.params.slug)));

interface ArticleContent {
  body: Component;
  sources?: ArticleSource[];
  sourcesNote?: string;
}

const contents: Record<string, ArticleContent> = {
  "ai-adoption-in-small-businesses": {
    body: defineAsyncComponent(
      () => import("../components/articles/ai-adoption/AiAdoptionArticle.vue"),
    ),
    sources: aiAdoptionSources,
    sourcesNote: aiAdoptionSourcesNote,
  },
};
const content = computed(() =>
  article.value ? contents[article.value.slug] : undefined,
);
const sources = computed(() => content.value?.sources ?? []);
provide(articleSourcesKey, sources);

// The view is reused when moving between articles, so update meta per slug
watch(
  article,
  (current) => {
    if (!current) return;
    const url = `${SITE.url}${articlePath(current.slug)}`;
    const modified = current.updated ?? current.published;
    const image = current.ogImage
      ? `${SITE.shareOrigin}${current.ogImage}`
      : SITE.ogImage;
    useMeta({
      title: `${current.title} | I Develop Tech`,
      description: current.summary,
      ogTitle: current.title,
      ogDescription: current.summary,
      ogUrl: url,
      ogImage: image,
      ogType: "article",
      article: {
        publishedTime: current.published,
        modifiedTime: modified,
        author: AUTHOR.name,
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: current.title,
        description: current.summary,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image,
        inLanguage: "en-US",
        isAccessibleForFree: true,
        ...(current.published && { datePublished: current.published }),
        ...(modified && { dateModified: modified }),
        author: {
          "@type": "Person",
          name: AUTHOR.name,
          url: `${SITE.url}/hire-me`,
          sameAs: [CONTACT.linkedin, CONTACT.github],
        },
        publisher: {
          "@type": "Organization",
          name: AUTHOR.company,
          url: SITE.url,
          logo: {
            "@type": "ImageObject",
            url: `${SITE.url}/images/brand/logo-black.png`,
          },
        },
      },
    });
  },
  { immediate: true },
);
</script>

<template>
  <NotFoundView v-if="!article" />
  <main v-else class="min-h-screen pt-20 bg-[#0a0a0a] text-white">
    <!-- On wide screens the contents list sits in the left margin and the article stays centered -->
    <div
      class="px-6 py-12 xl:grid xl:grid-cols-[1fr_minmax(0,48rem)_1fr] xl:gap-x-12"
    >
      <aside
        v-if="content"
        class="hidden xl:block xl:col-start-1 xl:row-start-1 xl:w-full xl:max-w-60 xl:justify-self-end"
      >
        <div
          class="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-4"
        >
          <ArticleToc :items="outline" :active-id="activeSection" />
        </div>
      </aside>
      <article
        ref="articleEl"
        class="max-w-3xl mx-auto xl:mx-0 xl:col-start-2 xl:row-start-1"
      >
        <header
          id="introduction"
          data-toc-label="Introduction"
          class="mb-12 border-b border-slate-800 pb-10"
        >
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
          <p class="text-sm text-slate-500 mt-6">
            By <span class="text-slate-200">{{ AUTHOR.name }}</span> ·
            {{ AUTHOR.company
            }}<template v-if="article.updated">
              · Updated {{ article.updated }}</template
            >
          </p>
        </header>

        <template v-if="content">
          <component :is="content.body" data-toc-root />
          <ArticleAuthor />
        </template>
        <div
          v-else
          class="rounded-lg border border-dashed border-slate-700 p-8 text-slate-500"
        >
          <p class="text-center">Draft in progress. Article body goes here.</p>
        </div>

        <aside
          class="mt-16 rounded-xl border border-cyan-900/40 bg-linear-to-br from-cyan-950/30 to-purple-950/20 p-8"
        >
          <h2 class="text-2xl font-bold mb-3">
            {{ article.cta?.title ?? "Working on something similar?" }}
          </h2>
          <p class="text-slate-300 mb-6">
            <template v-if="article.cta">{{ article.cta.body }}</template>
            <template v-else>
              See how I approach {{ article.relatedService.label }} engagements,
              or get in touch to talk through your situation.
            </template>
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
          <p
            v-if="article.cta?.aside"
            class="mt-6 border-t border-slate-800 pt-5 text-sm text-slate-400"
          >
            {{ article.cta.aside.text }}
            <router-link
              :to="article.cta.aside.path"
              class="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300"
            >
              {{ article.cta.aside.label }}
              <ArrowRightIcon class="h-3.5 w-3.5" aria-hidden="true" />
            </router-link>
          </p>
        </aside>

        <ArticleSources
          v-if="sources.length"
          :sources="sources"
          :note="content?.sourcesNote"
        />
      </article>
    </div>
  </main>
</template>
