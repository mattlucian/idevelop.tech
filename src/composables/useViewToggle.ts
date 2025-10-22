import { ref, computed } from 'vue'

export type ViewMode = 'business' | 'technical'

const currentView = ref<ViewMode>('technical')

export function useViewToggle() {
  const setView = (view: ViewMode) => {
    currentView.value = view
  }

  const toggleView = () => {
    currentView.value = currentView.value === 'business' ? 'technical' : 'business'
  }

  const isBusinessView = computed(() => currentView.value === 'business')
  const isTechnicalView = computed(() => currentView.value === 'technical')

  const themeClasses = computed(() => {
    return currentView.value === 'business'
      ? 'bg-gray-50 text-gray-900'
      : 'bg-[#0a0a0a] text-gray-100'
  })

  return {
    currentView: computed(() => currentView.value),
    setView,
    toggleView,
    isBusinessView,
    isTechnicalView,
    themeClasses
  }
}