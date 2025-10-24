import { ref } from 'vue'
import type { ServiceContent } from '../types/service'

export function useServiceData() {
  const serviceData = ref<ServiceContent | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const loadServiceData = async (serviceId: string) => {
    loading.value = true
    error.value = null

    try {
      let module

      // Dynamic import based on serviceId
      switch (serviceId) {
        case 'tech-admin':
          module = await import('../data/services/tech-admin.json?raw')
          break
        case 'integration':
          module = await import('../data/services/integration.json?raw')
          break
        case 'ai-enablement':
          module = await import('../data/services/ai-enablement.json?raw')
          break
        case 'ecommerce-ops':
          module = await import('../data/services/ecommerce-ops.json?raw')
          break
        case 'web-design':
          module = await import('../data/services/web-design.json?raw')
          break
        case 'cloud-consulting':
          module = await import('../data/services/cloud-consulting.json?raw')
          break
        default:
          throw new Error(`Unknown service: ${serviceId}`)
      }

      serviceData.value = JSON.parse(module.default)
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to load service data')
      console.error(`Error loading service data for ${serviceId}:`, err)
    } finally {
      loading.value = false
    }
  }

  return {
    serviceData,
    loading,
    error,
    loadServiceData,
  }
}
