<script setup lang="ts">
import { useMeta } from "../composables/useMeta";
import CTAForm from "../components/ui/CTAForm.vue";
import { SITE } from "@/constants";

useMeta({
  title: "Accessibility | I Develop Tech",
  description:
    "Our commitment to web accessibility and inclusive design. Learn about our WCAG 2.1 AA compliance efforts and request accessibility improvements.",
  ogTitle: "Accessibility | I Develop Tech",
  ogDescription: "Our commitment to web accessibility and inclusive design.",
  ogUrl: `${SITE.url}/accessibility`,
  ogImage: SITE.ogImage,
});
</script>

<template>
  <main id="main-content" class="min-h-screen pt-20 bg-[#0a0a0a] text-white">
    <div class="max-w-4xl mx-auto px-6 py-12">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-white">
          Accessibility
        </h1>
        <p class="text-lg text-gray-400">
          We're committed to making this website accessible to everyone,
          regardless of ability or technology.
        </p>
      </div>

      <!-- Standards Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4 text-cyan-400">
          Our Accessibility Standards
        </h2>
        <p class="text-gray-300 mb-4">
          This website aims to conform to the
          <a
            href="https://www.w3.org/WAI/WCAG21/quickref/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-cyan-400 hover:text-cyan-300 underline"
          >
            Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
          </a>
          . These guidelines help ensure that web content is accessible to
          people with disabilities.
        </p>
      </section>

      <!-- Features Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-cyan-400">
          Accessibility Features
        </h2>
        <div class="space-y-6">
          <!-- Skip Navigation -->
          <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-2 text-white">
              Skip Navigation
            </h3>
            <p class="text-gray-300">
              A "Skip to main content" link appears at the top of every page
              when you press the Tab key, allowing keyboard users to bypass
              repeated navigation elements.
            </p>
          </div>

          <!-- Screen Reader Support -->
          <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-2 text-white">
              Screen Reader Support
            </h3>
            <p class="text-gray-300">
              All pages use proper structural markup to help screen readers
              understand and navigate the content. Page regions are clearly
              labeled, making it easy to jump between sections.
            </p>
          </div>

          <!-- Keyboard Navigation -->
          <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-2 text-white">
              Keyboard Navigation
            </h3>
            <p class="text-gray-300 mb-3">
              All interactive elements are fully accessible via keyboard:
            </p>
            <ul class="list-disc list-inside text-gray-300 space-y-1">
              <li>Tab key navigates between interactive elements</li>
              <li>Enter or Space activates buttons and links</li>
              <li>Visible focus indicators show your current position</li>
              <li>Proper tab order follows logical page flow</li>
            </ul>
          </div>

          <!-- Descriptive Labels -->
          <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-2 text-white">
              Descriptive Labels
            </h3>
            <p class="text-gray-300">
              All buttons and interactive elements include clear descriptions
              for screen readers, especially icon-only buttons. Dynamic content
              updates are announced to assistive technologies.
            </p>
          </div>

          <!-- Focus Indicators -->
          <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-2 text-white">
              Focus Indicators
            </h3>
            <p class="text-gray-300">
              All interactive elements display clear, visible focus indicators
              (cyan outline rings) when navigating with a keyboard, making it
              easy to track your position.
            </p>
          </div>

          <!-- Form Accessibility -->
          <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-2 text-white">
              Accessible Forms
            </h3>
            <p class="text-gray-300 mb-3">Contact forms include:</p>
            <ul class="list-disc list-inside text-gray-300 space-y-1">
              <li>Clear labels for all form fields</li>
              <li>Helpful error messages and validation feedback</li>
              <li>
                Automatic announcements for screen readers when forms are
                submitted
              </li>
              <li>Visual indicators for required fields</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Feedback Section -->
      <section>
        <h2 class="text-2xl font-bold mb-4 text-cyan-400">
          Request Accessibility Improvement
        </h2>
        <p class="text-gray-300 mb-6">
          If you encounter any accessibility barriers or have suggestions for
          improvement, please let us know. Your feedback helps us create a more
          inclusive experience for everyone.
        </p>
        <CTAForm
          variant="dark"
          form-title="Report an Accessibility Issue"
          service-name="Accessibility Improvement Request"
        />
      </section>
    </div>
  </main>
</template>
