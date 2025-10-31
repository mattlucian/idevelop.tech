<script setup lang="ts">
import SimpleCheckItem from '../elements/SimpleCheckItem.vue'
import NumberedStep from '../elements/NumberedStep.vue'

interface Props {
  leftColumn: {
    title: string
    items: string[]
    color?: 'cyan' | 'emerald' | 'purple'
    type: 'check' | 'number'
  }
  rightColumn: {
    title: string
    items: string[]
    color?: 'cyan' | 'emerald' | 'purple'
    type: 'check' | 'number'
  }
}

withDefaults(defineProps<Props>(), {
  leftColumn: () => ({
    title: '',
    items: [],
    color: 'cyan',
    type: 'check',
  }),
  rightColumn: () => ({
    title: '',
    items: [],
    color: 'purple',
    type: 'number',
  }),
})
</script>

<template>
  <div class="bg-slate-900/30 border-y border-slate-800/30">
    <div class="max-w-5xl mx-auto px-6 py-16">
      <div class="grid md:grid-cols-2 gap-16">
        <!-- Left Column -->
        <div>
          <h2
            :class="[
              'text-sm font-semibold uppercase tracking-wider mb-4',
              leftColumn.color === 'cyan'
                ? 'text-cyan-400'
                : leftColumn.color === 'emerald'
                  ? 'text-emerald-400'
                  : 'text-purple-400',
            ]"
          >
            {{ leftColumn.title }}
          </h2>
          <ul class="space-y-4">
            <template v-if="leftColumn.type === 'check'">
              <SimpleCheckItem
                v-for="(item, index) in leftColumn.items"
                :key="`check-${index}`"
                :color="leftColumn.color"
              >
                {{ item }}
              </SimpleCheckItem>
            </template>
            <template v-else>
              <NumberedStep
                v-for="(item, index) in leftColumn.items"
                :key="`number-${index}`"
                :number="index + 1"
                :color="leftColumn.color"
              >
                {{ item }}
              </NumberedStep>
            </template>
          </ul>
        </div>

        <!-- Right Column -->
        <div>
          <h2
            :class="[
              'text-sm font-semibold uppercase tracking-wider mb-4',
              rightColumn.color === 'cyan'
                ? 'text-cyan-400'
                : rightColumn.color === 'emerald'
                  ? 'text-emerald-400'
                  : 'text-purple-400',
            ]"
          >
            {{ rightColumn.title }}
          </h2>
          <ul class="space-y-4">
            <template v-if="rightColumn.type === 'check'">
              <SimpleCheckItem
                v-for="(item, index) in rightColumn.items"
                :key="`check-${index}`"
                :color="rightColumn.color"
              >
                {{ item }}
              </SimpleCheckItem>
            </template>
            <template v-else>
              <NumberedStep
                v-for="(item, index) in rightColumn.items"
                :key="`number-${index}`"
                :number="index + 1"
                :color="rightColumn.color"
              >
                {{ item }}
              </NumberedStep>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
