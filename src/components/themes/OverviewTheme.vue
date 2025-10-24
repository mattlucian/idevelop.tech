<script setup lang="ts">
import type { ServiceContent, ServiceSection } from '../../types/service'

interface Props {
  section: ServiceSection
  serviceData: ServiceContent | null
}

defineProps<Props>()
</script>

<template>
  <div class="space-y-8">
    <!-- Key Features Display (from serviceData stats) -->
    <div
      v-if="serviceData && serviceData.stats && serviceData.stats.length > 0"
      class="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
    >
      <div v-for="(stat, index) in serviceData.stats" :key="index" class="relative group">
        <!-- Decorative background blur -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        ></div>

        <div
          class="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-cyan-500/20 rounded-xl p-5 text-center hover:border-cyan-400/40 transition-all"
        >
          <div
            class="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2"
          >
            {{ stat.value }}
          </div>
          <div class="text-xs text-gray-400 uppercase tracking-wider">{{ stat.label }}</div>
          <!-- Decorative corner accent -->
          <div class="absolute top-0 right-0 w-10 h-10 bg-cyan-500/5 rounded-bl-full"></div>
        </div>
      </div>
    </div>

    <!-- Key Highlights from serviceData -->
    <div
      v-if="serviceData && (serviceData.whatIOffer || serviceData.howItWorks)"
      class="max-w-4xl mx-auto"
    >
      <div class="grid md:grid-cols-2 gap-6">
        <!-- What I Offer -->
        <div
          v-if="serviceData.whatIOffer && serviceData.whatIOffer.length > 0"
          class="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/30 transition-all"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-white">What I Offer</h3>
          </div>
          <ul class="space-y-3">
            <li
              v-for="(item, index) in serviceData.whatIOffer"
              :key="index"
              class="flex items-start gap-2 text-sm text-gray-300"
            >
              <span class="text-cyan-400 mt-1 flex-shrink-0">▸</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- How It Works -->
        <div
          v-if="serviceData.howItWorks && serviceData.howItWorks.length > 0"
          class="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/30 transition-all"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-white">How It Works</h3>
          </div>
          <ul class="space-y-3">
            <li
              v-for="(item, index) in serviceData.howItWorks"
              :key="index"
              class="flex items-start gap-2 text-sm text-gray-300"
            >
              <span class="text-purple-400 mt-1 flex-shrink-0">▸</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
