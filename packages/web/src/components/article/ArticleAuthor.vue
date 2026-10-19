<script setup lang="ts">
import { AUTHOR, CONTACT } from "@/constants";
</script>

<template>
  <section
    class="mt-16 border-t border-slate-800 pt-10"
    aria-labelledby="article-author"
  >
    <p class="text-xs font-semibold uppercase tracking-wider text-cyan-400">
      About the author
    </p>
    <p id="article-author" class="mt-2 text-lg font-semibold text-white">
      {{ AUTHOR.name }}
    </p>
    <p class="text-sm text-slate-400">{{ AUTHOR.company }}</p>
    <p class="mt-4 leading-relaxed text-slate-300">{{ AUTHOR.bio }}</p>
    <a
      :href="CONTACT.linkedin"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-4 inline-block text-sm text-cyan-400 hover:text-cyan-300"
    >
      Connect on LinkedIn
    </a>
  </section>
</template>
