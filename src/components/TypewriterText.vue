<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}>()

const displayText = ref('')
const currentPhraseIndex = ref(0)
const isDeleting = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | null = null

const typingSpeed = props.typingSpeed || 100
const deletingSpeed = props.deletingSpeed || 50
const pauseDuration = props.pauseDuration || 2000

const animate = () => {
  const currentPhrase = props.phrases[currentPhraseIndex.value]
  if (!currentPhrase) return

  if (isDeleting.value) {
    // Delete character
    displayText.value = currentPhrase.substring(0, displayText.value.length - 1)

    if (displayText.value === '') {
      isDeleting.value = false
      currentPhraseIndex.value = (currentPhraseIndex.value + 1) % props.phrases.length
      timeoutId = setTimeout(animate, 500)
    } else {
      timeoutId = setTimeout(animate, deletingSpeed)
    }
  } else {
    // Type character
    displayText.value = currentPhrase.substring(0, displayText.value.length + 1)

    if (displayText.value === currentPhrase) {
      // Pause at the end
      timeoutId = setTimeout(() => {
        isDeleting.value = true
        animate()
      }, pauseDuration)
    } else {
      timeoutId = setTimeout(animate, typingSpeed)
    }
  }
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

<template>
  <span class="inline-block align-top min-w-0 sm:min-w-[240px]">
    {{ displayText }}<span class="animate-pulse">|</span>
  </span>
</template>
