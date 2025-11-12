<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMeta } from "../composables/useMeta";
import GradientText from "../components/elements/GradientText.vue";
import CTAForm from "../components/ui/CTAForm.vue";
import PrimaryButton from "../components/elements/buttons/PrimaryButton.vue";
import OutlineRouterLink from "../components/elements/buttons/OutlineRouterLink.vue";
import BenefitCard from "../components/cards/BenefitCard.vue";
import SimpleTestimonial from "../components/cards/SimpleTestimonial.vue";
import CheckItem from "../components/elements/CheckItem.vue";
import Badge from "../components/elements/badges/Badge.vue";
import CTASection from "../components/ui/CTASection.vue";
import Timeline from "../components/display/Timeline.vue";
import IconBadge from "../components/elements/badges/IconBadge.vue";
import OutlineIcon from "../components/elements/OutlineIcon.vue";
import Footer from "../components/layout/Footer.vue";
import { SCHEDULING_LINK, CONTACT, SITE } from "@/constants";
import {
  ClipboardDocumentIcon,
  ArrowPathIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  CalendarIcon,
  EnvelopeIcon,
  BookOpenIcon,
} from "@heroicons/vue/24/outline";

// Work experience timeline data
const workExperience = [
  {
    icon: "2014",
    label: "Senior Developer",
    desc: "Senior Developer at EverBank",
  },
  {
    icon: "2016",
    label: "Lead Developer",
    desc: "Lead Developer at Inventory Source",
  },
  {
    icon: "2019",
    label: "Startup CTO",
    desc: "CTO at Inventory Source and Flxpoint",
  },
  {
    icon: "2024",
    label: "CTO & Founder",
    desc: "CTO & Founder at I Develop Tech LLC",
  },
];

// Set meta tags for Hire Me page
useMeta({
  title: "Hire Me - Matt Myers | Technical Consulting",
  description:
    "CTO, full-stack engineer, and technology leader available for technical consulting. 10+ years experience in cloud architecture, software engineering, and team leadership.",
  ogTitle: "Hire Me - Matt Myers | Technical Consulting",
  ogDescription:
    "Schedule a consultation with an experienced CTO and full-stack engineer. Expert in cloud infrastructure, DevOps, and technical leadership.",
  ogUrl: `${SITE.url}/hire-me`,
  ogImage: SITE.ogImage,
});

const router = useRouter();

const openSchedulingLink = () => {
  window.open(SCHEDULING_LINK, "_blank", "noopener,noreferrer");
};

const goToService = (serviceId: string) => {
  router.push(`/services/${serviceId}`);
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
                <span class="font-semibold text-gray-300"
                  >Starting at $100/hour</span
                >
                <span class="text-xs text-gray-500">Examples</span>
              </div>
              <div class="space-y-1.5 text-xs mb-3">
                <div class="flex justify-between">
                  <span class="text-gray-500">Data Automation</span>
                  <span class="text-gray-400">~10 hours</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Simple Website</span>
                  <span class="text-gray-400">~40 hours</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Enterprise Integration</span>
                  <span class="text-gray-400">~60 hours</span>
                </div>
              </div>
              <p
                class="text-xs text-gray-500 italic text-center pt-2 border-t border-slate-700/30"
              >
                Discounted rates available for larger projects
              </p>
            </div>
          </div>
        </div>
        <div class="w-full md:w-[340px] lg:w-[400px] flex-shrink-0">
          <div class="md:sticky md:top-24">
            <CTAForm show-service-selector variant="dark" />
          </div>
        </div>
      </div>
    </div>

    <!-- Engagement Options - Moved to top -->
    <div class="max-w-5xl mx-auto px-6 py-12 border-t border-slate-800/50">
      <div class="text-center mb-10">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Flexible Engagement Models
        </h2>
        <p class="text-gray-400 text-lg">
          Choose the model that fits your needs
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Project-Based -->
        <div
          class="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-cyan-500/30 rounded-xl p-8"
        >
          <div class="flex items-center gap-3 mb-4">
            <OutlineIcon :icon="ClipboardDocumentIcon" size="lg" />
            <h3 class="text-2xl font-bold text-white">Project-Based</h3>
          </div>
          <p class="text-gray-400 mb-6">
            Focused engagements for specific goals and deliverables
          </p>
          <ul class="space-y-3 mb-8">
            <CheckItem color="cyan"> Starting at 10+ hours </CheckItem>
            <CheckItem color="cyan"> Fixed-fee pricing </CheckItem>
            <CheckItem color="cyan">
              Clear milestones and deliverables
            </CheckItem>
            <CheckItem color="cyan"> Regular progress updates </CheckItem>
            <CheckItem color="cyan"> Documentation included </CheckItem>
          </ul>
          <div class="flex items-center gap-2">
            <Badge variant="cyan"> Perfect for one-time builds </Badge>
          </div>
        </div>

        <!-- Retainer Model -->
        <div
          class="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-cyan-500/30 rounded-xl p-8"
        >
          <div class="flex items-center gap-3 mb-4">
            <OutlineIcon :icon="ArrowPathIcon" size="lg" />
            <h3 class="text-2xl font-bold text-white">Retainer Model</h3>
            <Badge variant="purple"> Popular </Badge>
          </div>
          <p class="text-gray-400 mb-6">
            Ongoing partnership for evolving technical needs
          </p>
          <ul class="space-y-3 mb-8">
            <CheckItem color="cyan"> 6+ months, 10-30 hrs/month </CheckItem>
            <CheckItem color="cyan">
              Burst capacity when you need it
            </CheckItem>
            <CheckItem color="cyan"> Responsive communication </CheckItem>
            <CheckItem color="cyan">
              Strategic planning + hands-on work
            </CheckItem>
            <CheckItem color="cyan">
              Fractional CTO services included
            </CheckItem>
          </ul>
          <div class="flex items-center gap-2">
            <Badge variant="cyan"> Best for ongoing support </Badge>
          </div>
        </div>
      </div>
    </div>

    <!-- Why Work With Me - Value Propositions -->
    <div class="max-w-5xl mx-auto px-6 py-12 pb-0">
      <div class="text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white">
          Why Work With Me
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Technical expertise delivering solutions for growing businesses
        </p>
      </div>
    </div>

    <!-- Credentials & Trust Indicators -->
    <div class="max-w-5xl mx-auto px-6 py-12 pt-10">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Technical Achievements -->
        <div
          class="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-slate-700/30 rounded-xl p-8"
        >
          <div class="flex items-center gap-3 mb-6">
            <OutlineIcon :icon="RocketLaunchIcon" size="lg" />
            <h3 class="text-2xl font-bold text-white">
              Technical Achievements
            </h3>
          </div>
          <ul class="space-y-3">
            <CheckItem color="cyan">
              Built systems handling billions of transactions
            </CheckItem>
            <CheckItem color="cyan">
              Delivered 50% infrastructure cost reduction
            </CheckItem>
            <CheckItem color="cyan">
              Designed cloud-native architectures (AWS)
            </CheckItem>
            <CheckItem color="cyan">
              Full-stack expertise across several languages
            </CheckItem>
            <CheckItem color="cyan">
              100+ successful integrations delivered
            </CheckItem>
          </ul>
        </div>

        <!-- Leadership Experience -->
        <div
          class="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-slate-700/30 rounded-xl p-8"
        >
          <div class="flex items-center gap-3 mb-6">
            <OutlineIcon :icon="UserGroupIcon" size="lg" />
            <h3 class="text-2xl font-bold text-white">Leadership Experience</h3>
          </div>
          <ul class="space-y-3">
            <CheckItem color="cyan">
              Scaled engineering teams 5→20 people
            </CheckItem>
            <CheckItem color="cyan">
              Managed $1M+ annual technology budgets
            </CheckItem>
            <CheckItem color="cyan"> Led SOC2 compliance efforts </CheckItem>
            <CheckItem color="cyan">
              Established engineering culture & processes
            </CheckItem>
            <CheckItem color="cyan">
              Mentored 10+ junior to senior engineers
            </CheckItem>
          </ul>
        </div>
      </div>
    </div>

    <!-- Work Experience Timeline (no heading) -->
    <div class="max-w-5xl mx-auto px-6 py-12 pt-8">
      <Timeline :steps="workExperience" variant="centered" />
    </div>

    <!-- Tech Skills Link Section -->
    <div class="max-w-5xl mx-auto px-6 py-8">
      <div
        class="bg-gradient-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-6 md:p-8"
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
          <div class="flex-shrink-0">
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
    </div>

    <!-- Social Proof - Testimonials (Updated with real quotes) -->
    <div class="max-w-5xl mx-auto px-6 py-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-3">
          What Clients Say
        </h2>
      </div>

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
    </div>

    <!-- CTA: Schedule a Call -->
    <div
      class="bg-gradient-to-br from-cyan-950/30 to-purple-950/20 border-y border-cyan-900/30"
    >
      <div class="max-w-5xl mx-auto px-6 py-20">
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started? Let's Talk.
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
              @click="openSchedulingLink"
              class="w-full sm:w-auto"
            >
              <span class="flex items-center gap-2 whitespace-nowrap">
                <OutlineIcon :icon="CalendarIcon" size="sm" color="white" />
                <span class="text-sm md:text-base"
                  >Schedule Free Consultation</span
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
            class="flex flex-wrap justify-center gap-4 text-sm text-slate-400"
          >
            <div class="flex items-center gap-2">
              <span>✓</span>
              <span>No sales pitch</span>
            </div>
            <div class="flex items-center gap-2">
              <span>✓</span>
              <span>Free consultation</span>
            </div>
            <div class="flex items-center gap-2">
              <span>✓</span>
              <span>Responsive during business hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Information Footer -->
    <div class="max-w-5xl mx-auto px-6 py-12 border-t border-slate-800/50">
      <div class="text-center">
        <h3 class="text-xl font-semibold text-white mb-4">
          Prefer to Reach Out Directly?
        </h3>
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300"
        >
          <a
            :href="`mailto:${CONTACT.email}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 hover:text-cyan-400 transition-colors"
          >
            <OutlineIcon :icon="EnvelopeIcon" size="sm" color="cyan" />
            <span>{{ CONTACT.email }}</span>
          </a>
          <div class="flex items-center gap-4">
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
