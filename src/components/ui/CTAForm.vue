<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import PrimaryButton from '../elements/buttons/PrimaryButton.vue'
import { SCHEDULING_LINK } from '@/constants'

interface Props {
  serviceName?: string
  variant?: 'default' | 'dark'
  showServiceSelector?: boolean
  formTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  serviceName: 'General Inquiry',
  variant: 'default',
  showServiceSelector: false,
  formTitle: undefined,
})

const formClasses = computed(() => {
  if (props.variant === 'dark') {
    return 'bg-[#0a0a0a] border border-slate-800 rounded-xl p-6'
  }
  return 'bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm'
})

const serviceOptions = [
  'General Inquiry',
  'Integration Services',
  'Tech Admin & Fractional CTO',
  'AI Enablement',
  'eCommerce Operations',
  'Web Design & Development',
  'Cloud & Infrastructure Consulting',
]

const formData = reactive({
  name: '',
  email: '',
  service: props.showServiceSelector ? serviceOptions[0] : props.serviceName,
  message: '',
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  showSuccess.value = false
  showError.value = false

  try {
    // TODO: Implement actual email submission
    // For now, just simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log form data (temporary - replace with actual API call)
    console.log('Form submitted:', formData)

    showSuccess.value = true
    // Reset form
    formData.name = ''
    formData.email = ''
    formData.message = ''
    if (props.showServiceSelector) {
      formData.service = serviceOptions[0]
    }
  } catch (error) {
    console.error('Form submission error:', error)
    showError.value = true
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div :class="formClasses">
    <h3 v-if="formTitle" class="text-xl font-bold text-white mb-5">{{ formTitle }}</h3>

    <form @submit.prevent="handleSubmit" class="space-y-3.5">
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-300 mb-1"> Name * </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          class="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          placeholder="John Doe"
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-300 mb-1"> Email * </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          class="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          placeholder="john@example.com"
        />
      </div>

      <!-- Service Selection (Optional) -->
      <div v-if="showServiceSelector">
        <label for="service" class="block text-sm font-medium text-gray-300 mb-1">
          Interested In
        </label>
        <select
          id="service"
          v-model="formData.service"
          class="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
        >
          <option v-for="option in serviceOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <!-- Message -->
      <div>
        <label for="message" class="block text-sm font-medium text-gray-300 mb-1"> Message </label>
        <textarea
          id="message"
          v-model="formData.message"
          rows="2"
          class="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none text-sm"
          placeholder="Brief project description..."
        />
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3">
        <PrimaryButton type="submit" :disabled="isSubmitting" class="flex-1">
          {{ isSubmitting ? 'Sending...' : 'Send Request' }}
        </PrimaryButton>
        <span class="text-gray-500 text-sm">or</span>
        <a :href="SCHEDULING_LINK" target="_blank" rel="noopener noreferrer" class="flex-shrink-0">
          <button
            type="button"
            class="px-4 py-2.5 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600 text-white rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span class="text-sm">Call</span>
          </button>
        </a>
      </div>

      <!-- Success Message -->
      <div
        v-if="showSuccess"
        class="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3"
      >
        ✓ Message sent! I'll get back to you within 24 hours.
      </div>

      <!-- Error Message -->
      <div
        v-if="showError"
        class="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3"
      >
        ⚠ Something went wrong. Please try again or email me directly.
      </div>
    </form>
  </div>
</template>
