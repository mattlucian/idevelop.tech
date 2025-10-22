<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]">
    <div class="w-full px-6 h-16 flex items-center justify-center relative">
      <div class="w-full max-w-[1200px] flex items-center justify-between relative">
        <!-- Logo (always visible) -->
        <router-link
          to="/"
          class="flex items-center hover:opacity-80 transition-opacity"
        >
          <img
            src="/images/brand/logo-black.png"
            alt="idevelop.tech"
            class="h-8"
            style="filter: brightness(0) saturate(100%) invert(70%) sepia(50%) saturate(500%) hue-rotate(130deg) brightness(100%) contrast(90%);"
          />
        </router-link>

        <!-- Spacer -->
        <div class="flex-1"></div>

        <!-- Hamburger Menu Button (Mobile) -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="sm:hidden flex items-center justify-center w-10 h-10 rounded-md text-gray-400 hover:text-teal-400 transition-colors"
          aria-label="Menu"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Page-specific navigation (Desktop) -->
        <div class="hidden sm:flex items-center gap-3 mr-4">
          <!-- Services button (shown on Experience page) -->
          <router-link
            v-if="isExperiencePage"
            to="/"
            class="px-4 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 rounded-md text-sm font-medium transition-all"
          >
            Services
          </router-link>

          <!-- Experience button (shown on Home page) -->
          <router-link
            v-if="isHomePage"
            to="/experience"
            class="px-4 py-1.5 bg-teal-500/10 hover:bg-teal-500/15 border border-teal-500/40 hover:border-teal-400 text-teal-400 hover:text-teal-300 rounded-md text-sm font-medium transition-all"
          >
            Experience
          </router-link>
        </div>

        <!-- Social Links -->
        <div class="hidden sm:flex items-center gap-4 mr-4">
          <a
            href="https://github.com/mattlucian"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-teal-400 transition-colors"
            aria-label="GitHub"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/matt-lucian/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-teal-400 transition-colors"
            aria-label="LinkedIn"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>

        <!-- Hire Me Button (Desktop) -->
        <router-link
          to="/hire-me"
          class="hidden sm:block px-4 py-1.5 bg-teal-500/10 hover:bg-teal-500/15 border-2 border-teal-500 hover:border-teal-400 text-teal-400 hover:text-teal-300 rounded-md text-sm font-semibold transition-all"
        >
          Hire Me
        </router-link>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="sm:hidden absolute top-16 left-0 right-0 bg-[#0a0a0a] border-b border-[#333333] shadow-lg"
      >
        <div class="px-6 py-4 space-y-3">
          <!-- Services/Experience Links -->
          <router-link
            v-if="isExperiencePage"
            to="/"
            @click="isMobileMenuOpen = false"
            class="block px-4 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 rounded-md text-sm font-medium transition-all text-center"
          >
            Services
          </router-link>

          <router-link
            v-if="isHomePage"
            to="/experience"
            @click="isMobileMenuOpen = false"
            class="block px-4 py-2.5 bg-teal-500/10 hover:bg-teal-500/15 border border-teal-500/40 hover:border-teal-400 text-teal-400 hover:text-teal-300 rounded-md text-sm font-medium transition-all text-center"
          >
            Experience
          </router-link>

          <!-- Social Links -->
          <div class="flex justify-center gap-6 py-2">
            <a
              href="https://github.com/mattlucian"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-teal-400 transition-colors"
              aria-label="GitHub"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/matt-lucian/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-teal-400 transition-colors"
              aria-label="LinkedIn"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          <!-- Hire Me Button -->
          <router-link
            to="/hire-me"
            @click="isMobileMenuOpen = false"
            class="block px-4 py-2.5 bg-teal-500/10 hover:bg-teal-500/15 border-2 border-teal-500 hover:border-teal-400 text-teal-400 hover:text-teal-300 rounded-md text-sm font-semibold transition-all text-center"
          >
            Hire Me
          </router-link>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const isHomePage = computed(() => route.name === 'home')
const isExperiencePage = computed(() => route.name === 'experience' || route.path.startsWith('/experience'))
</script>
