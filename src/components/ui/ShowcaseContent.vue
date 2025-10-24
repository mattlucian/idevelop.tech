<script setup lang="ts">
import TypewriterText from '../elements/interactive/TypewriterText.vue'
import ServiceCard from '../cards/ServiceCard.vue'
import PrimaryButton from '../elements/buttons/PrimaryButton.vue'
import SecondaryButton from '../elements/buttons/SecondaryButton.vue'
import Badge from '../elements/badges/Badge.vue'
import IconBadge from '../elements/badges/IconBadge.vue'
import IconCard from '../cards/IconCard.vue'
import ThinIconCard from '../cards/ThinIconCard.vue'
import Timeline from '../display/Timeline.vue'
import type { Step } from '../../types/shared/card'

interface Props {
  selectedComponentId: string
  expertisePhrases: string[]
}

defineProps<Props>()

// Example workflow steps for components
const exampleSteps: Step[] = [
  { icon: '🔍', label: 'Research', desc: 'Gather requirements and understand the problem space' },
  { icon: '🎨', label: 'Design', desc: 'Create wireframes and mockups for the solution' },
  { icon: '⚙️', label: 'Build', desc: 'Implement the solution with clean, tested code' },
  { icon: '🚀', label: 'Deploy', desc: 'Launch and monitor the production release' },
]
</script>

<template>
  <div class="space-y-6">
    <div v-if="selectedComponentId === 'colors'" class="space-y-6">
      <div>
        <h3 class="text-lg font-bold text-cyan-400 mb-4">Primary Colors (Cyan)</h3>
        <div class="grid grid-cols-3 gap-4">
          <div class="p-4 rounded-lg border border-[#333333]">
            <div class="w-full h-24 bg-cyan-300 rounded mb-2"></div>
            <div class="text-xs text-gray-400">cyan-300</div>
            <div class="text-xs font-mono text-white">#67e8f9</div>
          </div>
          <div class="p-4 rounded-lg border border-[#333333]">
            <div class="w-full h-24 bg-cyan-400 rounded mb-2"></div>
            <div class="text-xs text-gray-400">cyan-400</div>
            <div class="text-xs font-mono text-white">#22d3ee</div>
          </div>
          <div class="p-4 rounded-lg border border-[#333333]">
            <div class="w-full h-24 bg-cyan-500 rounded mb-2"></div>
            <div class="text-xs text-gray-400">cyan-500 ⭐</div>
            <div class="text-xs font-mono text-white">#06b6d4</div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-bold text-purple-400 mb-4">Accent Colors (Purple)</h3>
        <div class="grid grid-cols-3 gap-4">
          <div class="p-4 rounded-lg border border-[#333333]">
            <div class="w-full h-24 bg-purple-300 rounded mb-2"></div>
            <div class="text-xs text-gray-400">purple-300</div>
            <div class="text-xs font-mono text-white">#d8b4fe</div>
          </div>
          <div class="p-4 rounded-lg border border-[#333333]">
            <div class="w-full h-24 bg-purple-400 rounded mb-2"></div>
            <div class="text-xs text-gray-400">purple-400</div>
            <div class="text-xs font-mono text-white">#c084fc</div>
          </div>
          <div class="p-4 rounded-lg border border-[#333333]">
            <div class="w-full h-24 bg-purple-500 rounded mb-2"></div>
            <div class="text-xs text-gray-400">purple-500 ⭐</div>
            <div class="text-xs font-mono text-white">#a855f7</div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-bold text-gray-300 mb-4">Background & Borders</h3>
        <div class="grid grid-cols-3 gap-4">
          <div class="p-4 rounded-lg border border-[#333333]">
            <div class="w-full h-24 bg-[#0a0a0a] border border-gray-700 rounded mb-2"></div>
            <div class="text-xs text-gray-400">bg-main</div>
            <div class="text-xs font-mono text-white">#0a0a0a</div>
          </div>
          <div class="p-4 rounded-lg border border-[#333333]">
            <div class="w-full h-24 bg-[#0f0f0f] border border-gray-700 rounded mb-2"></div>
            <div class="text-xs text-gray-400">bg-card</div>
            <div class="text-xs font-mono text-white">#0f0f0f</div>
          </div>
          <div class="p-4 rounded-lg border border-[#333333]">
            <div class="w-full h-24 bg-[#1a1a1a] border border-gray-700 rounded mb-2"></div>
            <div class="text-xs text-gray-400">bg-panel</div>
            <div class="text-xs font-mono text-white">#1a1a1a</div>
          </div>
          <div class="p-4 rounded-lg border border-[#333333]">
            <div class="w-full h-24 bg-[#2a2a2a] rounded mb-2"></div>
            <div class="text-xs text-gray-400">border-subtle</div>
            <div class="text-xs font-mono text-white">#2a2a2a</div>
          </div>
          <div class="p-4 rounded-lg border border-[#333333]">
            <div class="w-full h-24 bg-[#333333] rounded mb-2"></div>
            <div class="text-xs text-gray-400">border</div>
            <div class="text-xs font-mono text-white">#333333</div>
          </div>
          <div class="p-4 rounded-lg border border-[#333333]">
            <div
              class="w-full h-24 bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 rounded mb-2"
            ></div>
            <div class="text-xs text-gray-400">gradient</div>
            <div class="text-xs font-mono text-white">cyan→purple</div>
          </div>
        </div>
      </div>

      <div class="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-sm font-bold text-white mb-2">Usage</h4>
        <pre
          class="text-xs text-gray-300 overflow-x-auto"
        ><code>text-cyan-400       // Primary brand color
text-purple-400     // Accent highlights
bg-[#0a0a0a]        // Page background
bg-[#0f0f0f]        // Card background
border-[#2a2a2a]    // Subtle borders</code></pre>
      </div>
    </div>

    <!-- Typography -->
    <div v-if="selectedComponentId === 'typography'" class="space-y-6">
      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h1 class="text-4xl font-bold text-white mb-2">Heading 1 - 4xl</h1>
        <code class="text-xs text-gray-400">text-4xl font-bold</code>
      </div>

      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h2 class="text-3xl font-bold text-white mb-2">Heading 2 - 3xl</h2>
        <code class="text-xs text-gray-400">text-3xl font-bold</code>
      </div>

      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h3 class="text-2xl font-bold text-white mb-2">Heading 3 - 2xl</h3>
        <code class="text-xs text-gray-400">text-2xl font-bold</code>
      </div>

      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <p class="text-base text-gray-300 mb-2">
          Body text - base size with proper line height for readability
        </p>
        <code class="text-xs text-gray-400">text-base text-gray-300</code>
      </div>

      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <p class="text-sm text-gray-400 mb-2">Secondary text - smaller size for descriptions</p>
        <code class="text-xs text-gray-400">text-sm text-gray-400</code>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] mt-6">
        <h4 class="text-sm font-bold text-cyan-400 mb-3">Responsive Pattern</h4>
        <pre class="text-xs text-gray-300 overflow-x-auto"><code>// Mobile → Tablet → Desktop
text-lg md:text-xl              // 18px → 20px
text-xl md:text-2xl lg:text-3xl // 20px → 24px → 30px
text-sm md:text-base            // 14px → 16px</code></pre>
      </div>
    </div>

    <!-- TypewriterText Component -->
    <div v-if="selectedComponentId === 'typewriter'" class="space-y-6">
      <div class="p-8 bg-[#1a1a1a] rounded-lg border border-[#333333] text-center">
        <TypewriterText
          :phrases="expertisePhrases"
          :typing-speed="80"
          :deleting-speed="40"
          :pause-duration="2000"
          class="text-cyan-400 font-semibold text-lg"
        />
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Usage</h4>
        <pre class="text-xs text-gray-300 overflow-x-auto"><code>&lt;TypewriterText
  :phrases="['phrase 1', 'phrase 2', 'phrase 3']"
  :typing-speed="80"
  :deleting-speed="40"
  :pause-duration="2000"
  class="text-cyan-400 font-semibold"
/&gt;</code></pre>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Props</h4>
        <div class="space-y-2 text-sm">
          <div>
            <code class="text-cyan-400">phrases</code>
            <span class="text-gray-400">- Array of strings to cycle through</span>
          </div>
          <div>
            <code class="text-cyan-400">typingSpeed</code>
            <span class="text-gray-400">- Milliseconds per character (default: 100)</span>
          </div>
          <div>
            <code class="text-cyan-400">deletingSpeed</code>
            <span class="text-gray-400">- Milliseconds per character (default: 50)</span>
          </div>
          <div>
            <code class="text-cyan-400">pauseDuration</code>
            <span class="text-gray-400">- Pause at end of phrase (default: 2000)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Gradient Text -->
    <div v-if="selectedComponentId === 'gradient-text'" class="space-y-6">
      <div class="p-8 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h1 class="text-3xl font-bold mb-6">
          <span class="text-white">Regular Text. </span>
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400"
          >
            Gradient Text.
          </span>
        </h1>

        <div class="group cursor-pointer inline-block">
          <h3
            class="text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all"
          >
            Hover for Gradient Effect →
          </h3>
        </div>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Static Gradient</h4>
        <pre
          class="text-xs text-gray-300 overflow-x-auto"
        ><code>&lt;span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400"&gt;
  Gradient Text
&lt;/span&gt;</code></pre>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Hover Gradient</h4>
        <pre
          class="text-xs text-gray-300 overflow-x-auto"
        ><code>&lt;h3 class="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all"&gt;
  Hover Text
&lt;/h3&gt;</code></pre>
      </div>
    </div>

    <!-- Stat Boxes -->
    <div v-if="selectedComponentId === 'stat-boxes'" class="space-y-6">
      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <div class="grid grid-cols-3 gap-1 md:gap-2">
          <div
            class="bg-[#0f0f0f] rounded-lg p-1 md:p-2 lg:p-3 text-center border border-[#2a2a2a]"
          >
            <div class="text-[13px] md:text-[15px] lg:text-[19px] font-bold text-cyan-400 mb-0.5">
              Expert
            </div>
            <div
              class="text-[6px] sm:text-[8px] md:text-[7px] lg:text-[9px] text-gray-500 md:uppercase tracking-tighter md:tracking-wide leading-[0.65rem] md:leading-tight break-words"
            >
              On Retainer
            </div>
          </div>
          <div
            class="bg-[#0f0f0f] rounded-lg p-1 md:p-2 lg:p-3 text-center border border-[#2a2a2a]"
          >
            <div class="text-[13px] md:text-[15px] lg:text-[19px] font-bold text-cyan-400 mb-0.5">
              Affordable
            </div>
            <div
              class="text-[6px] sm:text-[8px] md:text-[7px] lg:text-[9px] text-gray-500 md:uppercase tracking-tighter md:tracking-wide leading-[0.65rem] md:leading-tight break-words"
            >
              Access
            </div>
          </div>
          <div
            class="bg-[#0f0f0f] rounded-lg p-1 md:p-2 lg:p-3 text-center border border-[#2a2a2a]"
          >
            <div class="text-[13px] md:text-[15px] lg:text-[19px] font-bold text-cyan-400 mb-0.5">
              Quick
            </div>
            <div
              class="text-[6px] sm:text-[8px] md:text-[7px] lg:text-[9px] text-gray-500 md:uppercase tracking-tighter md:tracking-wide leading-[0.65rem] md:leading-tight break-words"
            >
              Implementation
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Mobile Optimization</h4>
        <ul class="text-xs text-gray-300 space-y-1">
          <li>• Ultra-small fonts (6-8px) to prevent overflow at 320px</li>
          <li>• Lowercase on mobile, uppercase on desktop</li>
          <li>• Minimal padding and gaps</li>
          <li>• Word breaking enabled</li>
          <li>• Tighter tracking and line-height</li>
        </ul>
      </div>
    </div>

    <!-- CTA Button -->
    <div v-if="selectedComponentId === 'cta-button'" class="space-y-6">
      <div class="p-8 bg-[#1a1a1a] rounded-lg border border-[#333333] text-center">
        <PrimaryButton> Let's Work Together </PrimaryButton>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Pattern</h4>
        <pre
          class="text-xs text-gray-300 overflow-x-auto"
        ><code>&lt;div class="inline-block w-full md:w-auto"&gt;
  &lt;div class="flex items-center justify-center gap-3 px-6 md:px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold"&gt;
    &lt;span&gt;Button Text&lt;/span&gt;
    &lt;svg class="hidden md:inline w-5 h-5"&gt;...&lt;/svg&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
      </div>
    </div>

    <!-- Button Variants -->
    <div v-if="selectedComponentId === 'button-variants'" class="space-y-6">
      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-lg font-bold text-white mb-4">CTA Button (Call-to-Action)</h4>
        <PrimaryButton :responsive="false"> Let's Work Together </PrimaryButton>
        <p class="text-xs text-gray-400 mt-3">
          Used for primary actions like "Schedule a Call" or "Let's Work Together"
        </p>
      </div>

      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-lg font-bold text-white mb-4">Explore Service Button</h4>
        <SecondaryButton> Explore Service </SecondaryButton>
        <p class="text-xs text-gray-400 mt-3">
          Used on service cards to navigate to service details
        </p>
      </div>

      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-lg font-bold text-white mb-4">Dark Button</h4>
        <button
          class="px-6 py-3 bg-[#1a1a1a] border border-[#333333] text-white rounded-lg hover:bg-[#2a2a2a] transition-all"
        >
          LinkedIn
        </button>
        <p class="text-xs text-gray-400 mt-3">
          Used for secondary actions, navigation items, and social links
        </p>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Usage Examples</h4>
        <pre class="text-xs text-gray-300 overflow-x-auto"><code>// CTA button (primary action)
&lt;button class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50"&gt;Let's Work Together&lt;/button&gt;

// Explore Service button
&lt;button class="w-full py-2.5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-300 rounded-lg"&gt;
  &lt;span&gt;Explore Service&lt;/span&gt;
  &lt;svg&gt;...arrow icon...&lt;/svg&gt;
&lt;/button&gt;

// Dark button (secondary actions)
&lt;button class="px-6 py-3 bg-[#1a1a1a] border border-[#333333] text-white rounded-lg hover:bg-[#2a2a2a]"&gt;LinkedIn&lt;/button&gt;</code></pre>
      </div>
    </div>

    <!-- Button Groups -->
    <div v-if="selectedComponentId === 'button-groups'" class="space-y-6">
      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-lg font-bold text-white mb-4">Flex Button Group</h4>
        <div class="flex gap-2">
          <button
            class="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#333333] text-white rounded-lg hover:bg-[#2a2a2a] transition-all"
          >
            Option 1
          </button>
          <button
            class="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#333333] text-white rounded-lg hover:bg-[#2a2a2a] transition-all"
          >
            Option 2
          </button>
          <button
            class="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#333333] text-white rounded-lg hover:bg-[#2a2a2a] transition-all"
          >
            Option 3
          </button>
        </div>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Pattern</h4>
        <pre class="text-xs text-gray-300 overflow-x-auto"><code>&lt;div class="flex gap-2"&gt;
  &lt;button class="flex-1 px-4 py-3 ..."&gt;Button 1&lt;/button&gt;
  &lt;button class="flex-1 px-4 py-3 ..."&gt;Button 2&lt;/button&gt;
  &lt;button class="flex-1 px-4 py-3 ..."&gt;Button 3&lt;/button&gt;
&lt;/div&gt;</code></pre>
      </div>
    </div>

    <!-- Icon Badges -->
    <div v-if="selectedComponentId === 'icon-badges'" class="space-y-6">
      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-lg font-bold text-white mb-4">Icon Badge Variants</h4>
        <div class="flex gap-4 items-center">
          <IconBadge size="sm" color="cyan" icon="📧" />
          <IconBadge size="md" color="purple" icon="💼" />
          <IconBadge size="lg" color="teal" icon="🚀" />
        </div>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Usage</h4>
        <pre class="text-xs text-gray-300 overflow-x-auto"><code>// Small (w-8 h-8)
&lt;div class="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center"&gt;
  &lt;span class="text-cyan-400"&gt;📧&lt;/span&gt;
&lt;/div&gt;

// Medium (w-10 h-10)
&lt;div class="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center"&gt;...&lt;/div&gt;

// Large (w-12 h-12)
&lt;div class="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center"&gt;...&lt;/div&gt;</code></pre>
      </div>
    </div>

    <!-- Icon Lists -->
    <div v-if="selectedComponentId === 'icon-list'" class="space-y-6">
      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-lg font-bold text-white mb-4">Checkmark List</h4>
        <div class="space-y-2">
          <div class="flex items-start gap-2">
            <svg
              class="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-300">First list item with checkmark</span>
          </div>
          <div class="flex items-start gap-2">
            <svg
              class="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-300">Second list item with checkmark</span>
          </div>
        </div>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Pattern</h4>
        <pre
          class="text-xs text-gray-300 overflow-x-auto"
        ><code>&lt;div class="flex items-start gap-2"&gt;
  &lt;svg class="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="currentColor"&gt;...&lt;/svg&gt;
  &lt;span&gt;List item text&lt;/span&gt;
&lt;/div&gt;</code></pre>
      </div>
    </div>

    <!-- Navigation -->
    <div v-if="selectedComponentId === 'navigation'" class="space-y-6">
      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-lg font-bold text-white mb-4">Navigation Component</h4>
        <p class="text-sm text-gray-300 mb-4">
          The Navigation component is a complex component found in
          <code class="text-cyan-400">Navigation.vue</code> with:
        </p>
        <ul class="text-sm text-gray-300 space-y-2">
          <li class="flex items-start gap-2">
            <span class="text-cyan-400">•</span>
            <span><strong>Fixed header:</strong> Sticky at top with backdrop blur</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-400">•</span>
            <span><strong>Mobile menu:</strong> Hamburger with dropdown</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-400">•</span>
            <span
              ><strong>Context-aware buttons:</strong> Shows "Services" on Experience page,
              etc.</span
            >
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-400">•</span>
            <span><strong>Social links:</strong> GitHub, LinkedIn (desktop only)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-400">•</span>
            <span
              ><strong>Z-index:</strong> Uses <code class="text-cyan-300">z-50</code> to stay above
              modals</span
            >
          </li>
        </ul>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Component Location</h4>
        <code class="text-xs text-cyan-400">/website/src/components/Navigation.vue</code>
      </div>
    </div>

    <!-- Custom Scrollbar -->
    <div v-if="selectedComponentId === 'scrollbar'" class="space-y-6">
      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-lg font-bold text-white mb-4">Scrollbar Preview</h4>
        <div
          class="h-32 overflow-y-auto scrollbar-visible bg-[#0f0f0f] p-4 rounded border border-[#333333]"
        >
          <p class="text-sm text-gray-300">Scroll to see custom scrollbar styling</p>
          <p class="text-sm text-gray-400 mt-2">Line 1</p>
          <p class="text-sm text-gray-400">Line 2</p>
          <p class="text-sm text-gray-400">Line 3</p>
          <p class="text-sm text-gray-400">Line 4</p>
          <p class="text-sm text-gray-400">Line 5</p>
          <p class="text-sm text-gray-400">Line 6</p>
          <p class="text-sm text-gray-400">Line 7</p>
          <p class="text-sm text-gray-400">Line 8</p>
        </div>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">CSS Pattern</h4>
        <pre
          class="text-xs text-gray-300 overflow-x-auto"
        ><code>.scrollbar-visible::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scrollbar-visible::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 4px;
}

.scrollbar-visible::-webkit-scrollbar-thumb {
  background: #333333;
  border-radius: 4px;
}

.scrollbar-visible::-webkit-scrollbar-thumb:hover {
  background: #444444;
}</code></pre>
      </div>
    </div>
    <!-- Tag Pills -->
    <div v-if="selectedComponentId === 'tag-pills'" class="space-y-6">
      <div>
        <h3 class="text-xl font-bold text-white mb-4">Service Tags (Cyan/Purple)</h3>
        <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
          <div class="flex flex-wrap gap-2">
            <Badge variant="default">API Integration</Badge>
            <Badge variant="default">Data Sync</Badge>
            <Badge variant="default">Automation</Badge>
          </div>
        </div>

        <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] mt-4">
          <h4 class="text-sm font-bold text-white mb-3">Usage</h4>
          <pre
            class="text-xs text-gray-300 overflow-x-auto"
          ><code>&lt;span class="px-2 md:px-2.5 py-0.5 md:py-1 text-[9px] md:text-[11px] font-semibold rounded-md bg-gradient-to-r from-cyan-500/15 to-purple-500/15 text-cyan-300 border border-cyan-500/30"&gt;
  Tag Name
&lt;/span&gt;</code></pre>
        </div>
      </div>

      <div>
        <h3 class="text-xl font-bold text-white mb-4">Experience Tags (Teal)</h3>
        <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
          <div class="flex flex-wrap gap-1.5">
            <Badge variant="teal">Java</Badge>
            <Badge variant="teal">C#</Badge>
            <Badge variant="teal">Vue.js</Badge>
            <Badge variant="teal">Docker</Badge>
            <Badge variant="teal">AWS</Badge>
          </div>
        </div>

        <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] mt-4">
          <h4 class="text-sm font-bold text-white mb-3">Usage</h4>
          <pre
            class="text-xs text-gray-300 overflow-x-auto"
          ><code>&lt;span class="px-2 py-0.5 rounded-md text-xs border text-teal-400 bg-teal-700/10 border-teal-700/20"&gt;
  Tag Name
&lt;/span&gt;</code></pre>
        </div>
      </div>
    </div>

    <!-- Side Panel Layout -->
    <div v-if="selectedComponentId === 'side-panel'" class="space-y-6">
      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-lg font-bold text-white mb-4">Complete Side Panel Page Layout</h4>
        <p class="text-sm text-gray-300 mb-4">
          A reusable pattern for browse/detail pages with left navigation and right content panel.
          This page demonstrates the full implementation.
        </p>

        <h5 class="text-base font-semibold text-cyan-400 mb-3">Components:</h5>
        <ul class="text-sm text-gray-300 space-y-2">
          <li class="flex items-start gap-2">
            <span class="text-cyan-400">•</span>
            <span
              ><strong>Left Panel:</strong> Fixed width (w-96) navigation with scrollable list</span
            >
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-400">•</span>
            <span><strong>Right Panel:</strong> Flexible content area (Desktop only)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-400">•</span>
            <span
              ><strong>Mobile Modal:</strong> Full-screen overlay with sticky header below
              navbar</span
            >
          </li>
        </ul>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-cyan-400 mb-3">1. Desktop Layout Structure</h4>
        <pre
          class="text-xs text-gray-300 overflow-x-auto"
        ><code>&lt;div class="fixed top-16 inset-0 flex"&gt;
  &lt;!-- Left Panel --&gt;
  &lt;div class="w-full lg:w-96 border-r border-[#333333] overflow-y-auto bg-[#0a0a0a]"&gt;
    &lt;div class="p-6"&gt;
      &lt;!-- Navigation items --&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- Right Panel (hidden on mobile) --&gt;
  &lt;div class="hidden lg:block flex-1 overflow-y-auto"&gt;
    &lt;div class="max-w-4xl mx-auto p-8"&gt;
      &lt;!-- Content --&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-cyan-400 mb-3">2. Mobile Modal Implementation</h4>
        <p class="text-xs text-gray-300 mb-3">Add this BEFORE the desktop layout structure:</p>
        <pre class="text-xs text-gray-300 overflow-x-auto"><code>&lt;!-- Mobile Modal Overlay --&gt;
&lt;Transition name="fade"&gt;
  &lt;div
    v-if="showMobileModal"
    class="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-[#0a0a0a] z-40 flex flex-col"
  &gt;
    &lt;!-- Sticky Header (stays below navbar) --&gt;
    &lt;div class="sticky top-0 bg-[#0a0a0a] border-b border-[#333333] p-3 flex items-center gap-3 z-10"&gt;
      &lt;button @click="closeMobileModal"&gt;
        &lt;svg class="w-6 h-6 text-cyan-400"&gt;
          &lt;!-- Back arrow icon --&gt;
        &lt;/svg&gt;
      &lt;/button&gt;
      &lt;h2 class="text-xl font-bold"&gt;&#123;&#123; selectedItem?.name &#125;&#125;&lt;/h2&gt;
    &lt;/div&gt;

    &lt;!-- Scrollable Content --&gt;
    &lt;div class="flex-1 overflow-y-auto p-4"&gt;
      &lt;!-- Same content as desktop right panel --&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/Transition&gt;</code></pre>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-cyan-400 mb-3">3. Vue Composition Setup</h4>
        <pre
          class="text-xs text-gray-300 overflow-x-auto"
        ><code>const selectedItemId = ref&lt;string&gt;('default')
const showMobileModal = ref&lt;boolean&gt;(false)

const selectItem = (id: string) =&gt; {
  selectedItemId.value = id
  showMobileModal.value = true  // Open modal on mobile
}

const closeMobileModal = () =&gt; {
  showMobileModal.value = false
}</code></pre>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Key Implementation Notes</h4>
        <ul class="text-xs text-gray-300 space-y-2">
          <li class="flex items-start gap-2">
            <span class="text-cyan-400">1.</span>
            <span
              ><strong>Modal Positioning:</strong> Use <code class="text-cyan-300">top-16</code> to
              start below navbar (64px height)</span
            >
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-400">2.</span>
            <span
              ><strong>Z-Index:</strong> Modal uses <code class="text-cyan-300">z-40</code>, navbar
              should use <code class="text-cyan-300">z-50</code></span
            >
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-400">3.</span>
            <span
              ><strong>Sticky Header:</strong> Use
              <code class="text-cyan-300">sticky top-0</code> inside modal (not top-16)</span
            >
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-400">4.</span>
            <span
              ><strong>Flexbox Layout:</strong> Parent uses
              <code class="text-cyan-300">flex flex-col</code>, content uses
              <code class="text-cyan-300">flex-1 overflow-y-auto</code></span
            >
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-400">5.</span>
            <span
              ><strong>Content Reuse:</strong> Mobile modal should display same content as desktop
              right panel</span
            >
          </li>
        </ul>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Common Pitfalls</h4>
        <ul class="text-xs text-gray-300 space-y-2">
          <li class="flex items-start gap-2">
            <span class="text-red-400">✗</span>
            <span
              >Using <code class="text-gray-400">inset-0</code> on modal - this covers navbar</span
            >
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-400">✓</span>
            <span
              >Use <code class="text-cyan-300">top-16 left-0 right-0 bottom-0</code> instead</span
            >
          </li>
          <li class="flex items-start gap-2">
            <span class="text-red-400">✗</span>
            <span>Making entire modal scrollable - content appears above header</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-400">✓</span>
            <span
              >Use flexbox with <code class="text-cyan-300">flex-1 overflow-y-auto</code> on content
              only</span
            >
          </li>
          <li class="flex items-start gap-2">
            <span class="text-red-400">✗</span>
            <span
              >Forgetting to hide desktop panel on mobile with
              <code class="text-gray-400">hidden lg:block</code></span
            >
          </li>
        </ul>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Used In</h4>
        <ul class="text-sm text-gray-300 space-y-1">
          <li>• Service detail views (ServiceBrowserView.vue)</li>
          <li>• Component showcase (this page - ComponentShowcase.vue)</li>
          <li>• Domain browser with topics (DomainBrowserView.vue)</li>
        </ul>
      </div>
    </div>

    <!-- Spacing System -->
    <div v-if="selectedComponentId === 'spacing'" class="space-y-6">
      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-lg font-bold text-white mb-4">Padding Scale</h4>
        <div class="space-y-2">
          <div class="flex items-center gap-4">
            <code class="text-cyan-400 w-16">p-1</code>
            <div class="bg-cyan-500/20 p-1"><div class="bg-cyan-500 h-4"></div></div>
            <span class="text-gray-400">4px</span>
          </div>
          <div class="flex items-center gap-4">
            <code class="text-cyan-400 w-16">p-2</code>
            <div class="bg-cyan-500/20 p-2"><div class="bg-cyan-500 h-4"></div></div>
            <span class="text-gray-400">8px</span>
          </div>
          <div class="flex items-center gap-4">
            <code class="text-cyan-400 w-16">p-4</code>
            <div class="bg-cyan-500/20 p-4"><div class="bg-cyan-500 h-4"></div></div>
            <span class="text-gray-400">16px</span>
          </div>
          <div class="flex items-center gap-4">
            <code class="text-cyan-400 w-16">p-6</code>
            <div class="bg-cyan-500/20 p-6"><div class="bg-cyan-500 h-4"></div></div>
            <span class="text-gray-400">24px</span>
          </div>
        </div>
      </div>

      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-lg font-bold text-white mb-4">Gap Scale</h4>
        <div class="space-y-4">
          <div>
            <code class="text-cyan-400 block mb-2">gap-1</code>
            <div class="flex gap-1">
              <div class="w-8 h-8 bg-cyan-500"></div>
              <div class="w-8 h-8 bg-cyan-500"></div>
              <div class="w-8 h-8 bg-cyan-500"></div>
            </div>
          </div>
          <div>
            <code class="text-cyan-400 block mb-2">gap-4</code>
            <div class="flex gap-4">
              <div class="w-8 h-8 bg-cyan-500"></div>
              <div class="w-8 h-8 bg-cyan-500"></div>
              <div class="w-8 h-8 bg-cyan-500"></div>
            </div>
          </div>
          <div>
            <code class="text-cyan-400 block mb-2">gap-6</code>
            <div class="flex gap-6">
              <div class="w-8 h-8 bg-cyan-500"></div>
              <div class="w-8 h-8 bg-cyan-500"></div>
              <div class="w-8 h-8 bg-cyan-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Badge Grid (Experience Stats) -->
    <div v-if="selectedComponentId === 'badge-grid'" class="space-y-6">
      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-lg font-bold text-white mb-4">Experience Stats Style</h4>
        <div class="flex gap-3">
          <div>
            <div class="text-base font-bold text-teal-400">10+</div>
            <div class="text-xs text-gray-500">Years</div>
          </div>
          <div>
            <div class="text-base font-bold text-teal-400">Full</div>
            <div class="text-xs text-gray-500">Stack</div>
          </div>
          <div>
            <div class="text-base font-bold text-teal-400">AI</div>
            <div class="text-xs text-gray-500">Enabled</div>
          </div>
        </div>
      </div>

      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <h4 class="text-lg font-bold text-white mb-4">Different Value Types</h4>
        <div class="flex gap-3 flex-wrap">
          <div>
            <div class="text-base font-bold text-teal-400">$50k</div>
            <div class="text-xs text-gray-500">Spend</div>
          </div>
          <div>
            <div class="text-base font-bold text-teal-400">50%</div>
            <div class="text-xs text-gray-500">Savings</div>
          </div>
          <div>
            <div class="text-base font-bold text-teal-400">100+</div>
            <div class="text-xs text-gray-500">Integrations</div>
          </div>
          <div>
            <div class="text-base font-bold text-teal-400">200M+</div>
            <div class="text-xs text-gray-500">Records</div>
          </div>
        </div>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Usage</h4>
        <pre class="text-xs text-gray-300 overflow-x-auto"><code>&lt;div class="flex gap-3"&gt;
  &lt;div&gt;
    &lt;div class="text-base font-bold text-teal-400"&gt;10+&lt;/div&gt;
    &lt;div class="text-xs text-gray-500"&gt;Years&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
      </div>
    </div>

    <!-- Card Variants -->
    <div v-if="selectedComponentId === 'cards'" class="space-y-8">
      <div>
        <h3 class="text-xl font-bold text-white mb-4">Service Card (Cyan/Purple)</h3>
        <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
          <div class="max-w-md">
            <ServiceCard
              icon="🔧"
              label="Example Service"
              title="Service Name"
              tagline="Short service description"
              :stats="[
                { value: 'Expert', label: 'Access' },
                { value: 'Quick', label: 'Setup' },
                { value: 'Scalable', label: 'Systems' },
              ]"
              :tags="['Tag 1', 'Tag 2', 'Tag 3']"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-xl font-bold text-white mb-4">Experience Card (Teal Accent)</h3>
        <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
          <div class="max-w-md">
            <div
              class="relative p-6 rounded-xl border-l-4 border-teal-700 border-t border-r border-b border-[#2a2a2a] bg-[#1a1a1a] hover:bg-[#1f1f1f] transition-all cursor-pointer"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center bg-teal-700/10">
                  <span class="text-xl">💻</span>
                </div>
                <div class="flex-1">
                  <div class="text-xs text-teal-400 font-semibold tracking-wider uppercase mb-1">
                    Software
                  </div>
                </div>
              </div>
              <h3 class="text-2xl font-bold mb-3 text-white">Software Engineering</h3>
              <div class="flex gap-3 mb-3">
                <div>
                  <div class="text-base font-bold text-teal-400">10+</div>
                  <div class="text-xs text-gray-500">Years</div>
                </div>
                <div>
                  <div class="text-base font-bold text-teal-400">Full</div>
                  <div class="text-xs text-gray-500">Stack</div>
                </div>
                <div>
                  <div class="text-base font-bold text-teal-400">AI</div>
                  <div class="text-xs text-gray-500">Enabled</div>
                </div>
              </div>
              <div class="flex gap-1.5 flex-wrap">
                <span
                  class="px-2 py-0.5 rounded-md text-xs border text-teal-400 bg-teal-700/10 border-teal-700/20"
                >
                  Java
                </span>
                <span
                  class="px-2 py-0.5 rounded-md text-xs border text-teal-400 bg-teal-700/10 border-teal-700/20"
                >
                  C#
                </span>
                <span
                  class="px-2 py-0.5 rounded-md text-xs border text-teal-400 bg-teal-700/10 border-teal-700/20"
                >
                  Vue.js
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Heading -->
    <div v-if="selectedComponentId === 'section-heading'" class="space-y-6">
      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <div class="flex items-center gap-2 mb-3">
          <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 class="text-base font-bold text-cyan-400 uppercase tracking-wider">
            Section Heading
          </h3>
        </div>
        <p class="text-sm text-gray-300">
          Section headings use an icon, uppercase text, and cyan color for emphasis.
        </p>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Usage</h4>
        <pre
          class="text-xs text-gray-300 overflow-x-auto"
        ><code>&lt;div class="flex items-center gap-2 mb-3"&gt;
  &lt;svg class="w-5 h-5 text-cyan-400"&gt;...&lt;/svg&gt;
  &lt;h3 class="text-base font-bold text-cyan-400 uppercase tracking-wider"&gt;
    Section Title
  &lt;/h3&gt;
&lt;/div&gt;</code></pre>
      </div>
    </div>

    <!-- Intro Box -->
    <div v-if="selectedComponentId === 'intro-box'" class="space-y-6">
      <div class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333]">
        <div
          class="relative bg-gradient-to-br from-[#1a1a1a] to-[#151515] border-2 border-cyan-500/30 rounded-xl p-5 overflow-hidden"
        >
          <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full"></div>
          <div class="relative">
            <div class="flex items-center gap-2 mb-3">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h4 class="text-base font-bold text-cyan-400 uppercase tracking-wider">Overview</h4>
            </div>
            <p class="text-base text-gray-200 leading-relaxed">
              This is an intro box used to highlight important overview information at the top of
              service detail pages. It features a gradient background, decorative corner accent, and
              prominent border.
            </p>
          </div>
        </div>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Features</h4>
        <ul class="text-xs text-gray-300 space-y-1">
          <li>• Gradient background from #1a1a1a to #151515</li>
          <li>• Cyan border with 30% opacity</li>
          <li>• Decorative corner accent (blur circle)</li>
          <li>• Section icon and uppercase heading</li>
        </ul>
      </div>
    </div>

    <!-- Blur Decoration -->
    <div v-if="selectedComponentId === 'blur-decoration'" class="space-y-6">
      <div
        class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333] relative overflow-hidden"
        style="min-height: 200px"
      >
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-32 bg-cyan-500/5 blur-3xl rounded-full"
        ></div>
        <div class="relative text-center">
          <h4 class="text-lg font-bold text-white mb-2">Centered Blur</h4>
          <p class="text-sm text-gray-400">Used behind headers for subtle depth</p>
        </div>
      </div>

      <div
        class="p-6 bg-[#1a1a1a] rounded-lg border border-[#333333] relative overflow-hidden group cursor-pointer"
        style="min-height: 200px"
      >
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-500"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all duration-500"
        ></div>
        <div class="relative text-center">
          <h4 class="text-lg font-bold text-white mb-2">Corner Blurs (Hover Me)</h4>
          <p class="text-sm text-gray-400">
            Decorative background elements that intensify on hover
          </p>
        </div>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Usage</h4>
        <pre class="text-xs text-gray-300 overflow-x-auto"><code>&lt;!-- Static blur --&gt;
&lt;div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-32 bg-cyan-500/5 blur-3xl rounded-full"&gt;&lt;/div&gt;

&lt;!-- Interactive blur --&gt;
&lt;div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-500"&gt;&lt;/div&gt;</code></pre>
      </div>
    </div>

    <!-- WorkflowBoxed -->
    <div v-if="selectedComponentId === 'workflow-boxed'" class="space-y-6">
      <div class="p-6 bg-[#0a0a0a] rounded-lg border border-[#333333]">
        <IconCard title="Example Process" :steps="exampleSteps" />
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Component File</h4>
        <p class="text-xs text-gray-400 font-mono">/src/components/cards/IconCard.vue</p>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Usage in ProcessTheme</h4>
        <pre class="text-xs text-gray-300 overflow-x-auto"><code>{
  "theme": "process",
  "visual": {
    "type": "workflow",
    "data": {
      "style": "boxed",  // or omit for default
      "title": "Example Process",
      "steps": [
        { "icon": "🔍", "label": "Step 1", "desc": "Description" }
      ]
    }
  }
}</code></pre>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Features</h4>
        <ul class="text-xs text-gray-300 space-y-1">
          <li>• Large centered icons (4xl size)</li>
          <li>• 2-column grid layout</li>
          <li>• Card-based design with gradient backgrounds</li>
          <li>• Hover effects on borders</li>
          <li>• Best for 4 or fewer steps</li>
        </ul>
      </div>
    </div>

    <!-- WorkflowBoxedInline -->
    <div v-if="selectedComponentId === 'workflow-boxed-inline'" class="space-y-6">
      <div class="p-6 bg-[#0a0a0a] rounded-lg border border-[#333333]">
        <ThinIconCard title="Example Process" :steps="exampleSteps" />
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Component File</h4>
        <p class="text-xs text-gray-400 font-mono">/src/components/cards/ThinIconCard.vue</p>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Usage in ProcessTheme</h4>
        <pre class="text-xs text-gray-300 overflow-x-auto"><code>{
  "theme": "process",
  "visual": {
    "type": "workflow",
    "data": {
      "style": "boxed-inline",
      "title": "Example Process",
      "steps": [
        { "icon": "🔍", "label": "Step 1", "desc": "Description" }
      ]
    }
  }
}</code></pre>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Features</h4>
        <ul class="text-xs text-gray-300 space-y-1">
          <li>• Icon positioned left, content right</li>
          <li>• 2-column grid layout</li>
          <li>• More compact than boxed style</li>
          <li>• Card-based design with gradient backgrounds</li>
          <li>• Good for 4-6 steps</li>
        </ul>
      </div>
    </div>

    <!-- Timeline -->
    <div v-if="selectedComponentId === 'workflow-timeline'" class="space-y-6">
      <div class="p-6 bg-[#0a0a0a] rounded-lg border border-[#333333]">
        <Timeline title="Example Process" :steps="exampleSteps" />
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Component File</h4>
        <p class="text-xs text-gray-400 font-mono">/src/components/display/Timeline.vue</p>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Usage in ProcessTheme</h4>
        <pre class="text-xs text-gray-300 overflow-x-auto"><code>{
  "theme": "process",
  "visual": {
    "type": "workflow",
    "data": {
      "style": "timeline",
      "title": "Example Process",
      "steps": [
        { "icon": "🔍", "label": "Step 1", "desc": "Description" }
      ]
    }
  }
}</code></pre>
      </div>

      <div class="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
        <h4 class="text-sm font-bold text-white mb-3">Features</h4>
        <ul class="text-xs text-gray-300 space-y-1">
          <li>• Vertical timeline with connecting line</li>
          <li>• Sequential step-by-step presentation</li>
          <li>• Icon badges with gradient borders</li>
          <li>• Best for processes with clear order</li>
          <li>• Scales well for 3-8 steps</li>
        </ul>
      </div>
    </div>
  </div>
</template>
