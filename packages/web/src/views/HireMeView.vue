<script setup lang="ts">
import { usePageMeta } from "@/composables/usePageMeta";
import GradientText from "../components/elements/GradientText.vue";
import CTAForm from "../components/ui/CTAForm.vue";
import PrimaryButton from "../components/elements/buttons/PrimaryButton.vue";
import OutlineRouterLink from "../components/elements/buttons/OutlineRouterLink.vue";
import SimpleTestimonial from "../components/cards/SimpleTestimonial.vue";
import ContentSection from "../components/ui/ContentSection.vue";
import EngagementModelCard from "../components/hire-me/EngagementModelCard.vue";
import RecentArticles from "../components/ui/RecentArticles.vue";
import OutlineIcon from "../components/elements/OutlineIcon.vue";
import Footer from "../components/layout/Footer.vue";
import { SCHEDULING_LINK, CONTACT, SITE } from "@/constants";
import { serviceCards } from "@/composables/useServiceConfig";
import { getIconByName } from "@/utils/iconMapping";
import {
  ClipboardDocumentIcon,
  ArrowPathIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  CalendarIcon,
  EnvelopeIcon,
  BookOpenIcon,
  ArrowRightIcon,
  BriefcaseIcon,
} from "@heroicons/vue/24/outline";

const workExperience = [
  { years: "2014 – 2016", title: "Senior Developer", company: "EverBank" },
  {
    years: "2016 – 2020",
    title: "Lead Developer",
    company: "Inventory Source",
  },
  {
    years: "2020 – 2024",
    title: "Startup CTO",
    company: "Inventory Source and Flxpoint",
  },
  {
    years: "2024 – Present",
    title: "Independent",
    company: "I Develop Tech",
    current: true,
  },
];

const credentials = [
  {
    title: "Technical Achievements",
    icon: RocketLaunchIcon,
    stats: [
      {
        value: "Billions",
        label: "of transactions handled by systems I built",
      },
      { value: "50%", label: "infrastructure cost reduction delivered" },
      { value: "100+", label: "integrations delivered" },
      { value: "AWS", label: "cloud-native architectures designed" },
      { value: "Full-stack", label: "development across several languages" },
    ],
  },
  {
    title: "Leadership Experience",
    icon: UserGroupIcon,
    stats: [
      { value: "5 → 20", label: "engineering team scaled" },
      { value: "$1M+", label: "annual technology budgets managed" },
      { value: "SOC 2", label: "compliance efforts led" },
      { value: "10+", label: "engineers mentored, from junior to senior" },
      {
        value: "Process",
        label: "engineering culture and processes established",
      },
    ],
  },
];

const rateExamples = [
  { task: "Data automation", hours: "~10 hours" },
  { task: "AI workflow", hours: "~20 hours" },
  { task: "System integration", hours: "~40–60 hours" },
];

const projectSteps = [
  { text: "Short scoping call" },
  { text: "Proposal and contract" },
  { text: "Build, with progress updates" },
  { text: "Review and hand off" },
  { text: "Optional retainer afterward", optional: true },
];

const retainerSteps = [
  { text: "Start after a project, or with a one-time paid onboarding" },
  { text: "Agree on the month's priorities" },
  { text: "Work through them, with progress updates" },
  { text: "Review the month" },
];

const services = serviceCards.map((card) => ({
  ...card,
  to: `/services/${card.name}`,
  iconComponent: getIconByName(card.icon),
}));

usePageMeta({
  title: "Hire Me: Technical Consulting With Matt Myers",
  slug: "hire-me",
  description:
    "Technical consulting with Matt Myers for small and mid-size businesses: system integrations, automation, cloud infrastructure, and AI adoption. Project-based work or a monthly retainer.",
  ogDescription:
    "Technical consulting for small and mid-size businesses, as project-based work or a monthly retainer.",
  ogImage: SITE.ogImage,
});

const openSchedulingLink = () => {
  window.open(SCHEDULING_LINK, "_blank", "noopener,noreferrer");
};
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] pt-16">
    <!-- Hero Section with Dual CTAs -->
    <div class="max-w-5xl mx-auto px-6 py-8">
      <div class="flex flex-col md:flex-row gap-8 md:gap-12">
        <div class="flex-1 max-w-3xl">
          <GradientText
            tag="h1"
            class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            text="Hire Technical Expertise"
          />
          <p class="text-lg md:text-xl text-slate-400 leading-relaxed mb-6">
            Experienced technology professional offering strategic planning and
            hands-on engineering for growing businesses
          </p>
          <div class="mb-6">
            <!-- Rate Card -->
            <div
              class="bg-slate-900/40 border border-slate-700/40 rounded-lg p-4 text-sm text-gray-400"
            >
              <div class="flex items-center justify-between mb-3">
                <span class="font-semibold text-gray-300">$100–125/hour</span>
                <span class="text-xs text-gray-500">Example sizes</span>
              </div>
              <div class="space-y-1.5 text-xs mb-3">
                <div
                  v-for="example in rateExamples"
                  :key="example.task"
                  class="flex justify-between"
                >
                  <span class="text-gray-500">{{ example.task }}</span>
                  <span class="text-gray-400">{{ example.hours }}</span>
                </div>
              </div>
              <p
                class="text-xs text-gray-500 italic text-center pt-2 border-t border-slate-700/30"
              >
                Simplified examples. Each project is scoped and quoted before
                work starts, and larger projects can get a discounted rate.
              </p>
            </div>
          </div>
        </div>
        <div class="w-full md:w-[340px] lg:w-[400px] shrink-0">
          <div>
            <CTAForm show-service-selector variant="dark" />
          </div>
        </div>
      </div>
    </div>

    <!-- Engagement models -->
    <ContentSection
      banded
      title="Flexible Engagement Models"
      subtitle="Choose the model that fits your needs."
    >
      <div class="grid gap-6 md:grid-cols-2">
        <EngagementModelCard
          :icon="ClipboardDocumentIcon"
          title="Project-Based"
          description="Focused work toward a specific goal, for a fixed fee agreed up front."
          :facts="['10-hour minimum', 'Fixed fee', 'Documentation included']"
          :steps="projectSteps"
        />
        <EngagementModelCard
          :icon="ArrowPathIcon"
          title="Retainer"
          description="A set number of monthly hours for ongoing technical needs, guided by a roadmap built on your priorities."
          :facts="[
            'Monthly hours agreed up front',
            'Typically 10 to 30 hours',
            'Extra hours sometimes available at a higher rate',
          ]"
          :steps="retainerSteps"
          repeat="Repeats each month"
        />
      </div>
    </ContentSection>

    <!-- Why work with me -->
    <ContentSection
      id="about"
      title="Why Work With Me"
      subtitle="Background in software engineering and technical leadership."
    >
      <div class="space-y-8">
        <div v-for="group in credentials" :key="group.title">
          <div class="mb-3 flex items-center gap-2">
            <OutlineIcon :icon="group.icon" size="md" />
            <h3
              class="text-sm font-semibold uppercase tracking-wider text-slate-300"
            >
              {{ group.title }}
            </h3>
          </div>
          <ul class="grid grid-cols-2 gap-3 md:grid-cols-5">
            <li
              v-for="stat in group.stats"
              :key="stat.label"
              class="rounded-xl border border-cyan-500/20 bg-[#0f0f0f] p-4 last:col-span-2 md:last:col-span-1"
            >
              <div class="text-2xl font-bold text-white">{{ stat.value }}</div>
              <div class="mt-1 text-xs text-slate-400">{{ stat.label }}</div>
            </li>
          </ul>
        </div>
      </div>

      <div class="py-12">
        <div class="mb-3 flex items-center gap-2">
          <OutlineIcon :icon="BriefcaseIcon" size="md" />
          <h3
            class="text-sm font-semibold uppercase tracking-wider text-slate-300"
          >
            Work History
          </h3>
        </div>
        <ol class="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <li
            v-for="role in workExperience"
            :key="role.years"
            :class="[
              'rounded-xl border bg-[#0f0f0f] p-4',
              role.current ? 'border-cyan-500/50' : 'border-slate-700/50',
            ]"
          >
            <div class="flex h-5 items-center justify-between gap-2">
              <span class="font-mono text-xs text-cyan-400">{{
                role.years
              }}</span>
              <span
                v-if="role.current"
                class="rounded-full border border-cyan-500/40 px-2 text-[10px] leading-4 text-cyan-300"
              >
                Current
              </span>
            </div>
            <div class="mt-2 font-semibold text-white">{{ role.title }}</div>
            <div class="text-sm text-slate-400">{{ role.company }}</div>
          </li>
        </ol>
      </div>

      <div
        class="bg-linear-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-6 md:p-8"
      >
        <div class="flex flex-col md:flex-row items-center gap-6">
          <!-- Text Content -->
          <div class="flex-1 text-center md:text-left">
            <h3 class="text-xl md:text-2xl font-bold text-white mb-2">
              Explore My Technical Expertise
            </h3>
            <p class="text-sm md:text-base text-gray-400 mb-4">
              Cloud & DevOps • Full-Stack Development • Systems Integration
            </p>
          </div>

          <!-- CTA Button -->
          <div class="shrink-0">
            <OutlineRouterLink
              to="/tech"
              color-scheme="emerald"
              class="inline-flex items-center gap-2"
            >
              <OutlineIcon :icon="BookOpenIcon" size="sm" color="emerald" />
              <span>View Technical Expertise</span>
            </OutlineRouterLink>
          </div>
        </div>
      </div>
    </ContentSection>

    <!-- Testimonials -->
    <ContentSection banded title="What Clients Say">
      <div class="grid md:grid-cols-3 gap-6">
        <SimpleTestimonial
          quote="Matt was able to help us accelerate our roadmap by efficiently executing on multiple supplier integrations!"
          author="Travis"
          role="CEO, Flxpoint"
          color-scheme="cyan"
        />
        <SimpleTestimonial
          quote="I can't believe how great the site looks now and the additional functionalities we have! I'm very happy with the way things turned out!"
          author="Pam"
          role="Owner, Mr Mochas Pet"
          color-scheme="cyan"
        />
        <SimpleTestimonial
          quote="[Matt's] expertise, knowledge, and experience in systems, software, and all technical aspects are exceptional"
          author="Neil"
          role="CEO, SafariSA"
          color-scheme="cyan"
        />
      </div>
    </ContentSection>

    <!-- Services and articles -->
    <ContentSection
      title="Services"
      subtitle="Details on each type of work, with examples."
    >
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <router-link
          v-for="service in services"
          :key="service.name"
          :to="service.to"
          class="group flex items-start gap-3 rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-4 transition-colors hover:border-cyan-500/40"
        >
          <OutlineIcon
            v-if="service.iconComponent"
            :icon="service.iconComponent"
            size="md"
            color="cyan"
          />
          <span class="flex-1">
            <span class="block font-semibold text-white">{{
              service.title
            }}</span>
            <span class="mt-0.5 block text-sm text-slate-400">{{
              service.tagline
            }}</span>
          </span>
          <ArrowRightIcon
            class="mt-1 h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-cyan-400"
          />
        </router-link>
      </div>

      <RecentArticles class="mt-12" />
    </ContentSection>

    <!-- Contact -->
    <div
      class="bg-linear-to-br from-cyan-950/30 to-purple-950/20 border-y border-cyan-900/30"
    >
      <div class="max-w-5xl mx-auto px-6 py-20">
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Schedule a Consultation
          </h2>
          <p class="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Schedule a free 30-minute consultation to discuss your project. No
            commitment required.
          </p>
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 w-full px-4"
          >
            <PrimaryButton
              :show-arrow="true"
              :full-width="false"
              class="w-full sm:w-auto"
              @click="openSchedulingLink"
            >
              <span class="flex items-center gap-2 whitespace-nowrap">
                <OutlineIcon :icon="CalendarIcon" size="sm" color="white" />
                <span class="text-sm md:text-base"
                  >Schedule a Free Consultation</span
                >
              </span>
            </PrimaryButton>
            <OutlineRouterLink
              :to="`mailto:${CONTACT.email}`"
              :external="true"
              color-scheme="cyan"
              class="w-full sm:w-auto inline-flex items-center justify-center"
            >
              <span class="flex items-center gap-2 whitespace-nowrap">
                <OutlineIcon :icon="EnvelopeIcon" size="sm" color="cyan" />
                <span class="text-sm md:text-base">Email Instead</span>
              </span>
            </OutlineRouterLink>
          </div>
          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-slate-400"
          >
            <a
              :href="`mailto:${CONTACT.email}`"
              class="hover:text-cyan-400 transition-colors"
            >
              {{ CONTACT.email }}
            </a>
            <a
              :href="CONTACT.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              :href="CONTACT.github"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>
