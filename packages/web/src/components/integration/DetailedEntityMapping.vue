<script setup lang="ts">
// This component displays a detailed field-by-field entity mapping example
// showing how data transforms from one system to another with direct mappings,
// lookups, and custom business rules
</script>

<template>
  <!-- Detailed Entity Mapping Example -->
  <div class="max-w-5xl mx-auto px-6 py-16">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Transparent Data Mapping
      </h2>
      <p class="text-lg text-slate-400 max-w-2xl mx-auto">
        See exactly how your data transforms between systems. Every field
        mapping is documented and configurable.
      </p>
    </div>

    <!-- Entity Mapping Container -->
    <div
      class="bg-gradient-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-6 md:p-8"
    >
      <!-- Entity Headers - Desktop -->
      <div
        class="hidden md:flex justify-between items-center mb-8 pb-6 border-b border-slate-700/30"
      >
        <div class="flex-1">
          <h3 class="text-2xl font-bold text-cyan-400 mb-2">Order</h3>
          <p class="text-sm text-slate-400">eCommerce Entity</p>
        </div>
        <div class="w-32 text-center">
          <div
            class="text-sm font-semibold text-purple-400 uppercase tracking-wider"
          >
            Transform
          </div>
        </div>
        <div class="flex-1 text-right">
          <h3 class="text-2xl font-bold text-emerald-400 mb-2">Invoice</h3>
          <p class="text-sm text-slate-400">Accounting Entity</p>
        </div>
      </div>

      <!-- Entity Headers - Mobile (Compact) -->
      <div class="flex md:hidden gap-2 mb-6 text-center">
        <div
          class="flex-1 bg-slate-800/60 border border-cyan-500/40 rounded px-2 py-2"
        >
          <div class="text-sm font-bold text-cyan-400">Order</div>
          <div class="text-xs text-slate-500 mt-0.5">eCommerce</div>
        </div>
        <div class="w-8 flex-shrink-0"></div>
        <div
          class="flex-1 bg-slate-800/60 border border-emerald-500/40 rounded px-2 py-2"
        >
          <div class="text-sm font-bold text-emerald-400">Invoice</div>
          <div class="text-xs text-slate-500 mt-0.5">Accounting</div>
        </div>
      </div>

      <!-- Field Mappings -->
      <div class="space-y-4 md:space-y-6">
        <!-- Mapping 1: id -> invoiceId -->
        <div class="flex items-center gap-3 md:gap-4">
          <!-- Source Field -->
          <div
            class="flex-1 bg-slate-800/40 border border-slate-600/30 rounded px-2 py-1.5 md:px-4 md:py-2.5 min-h-[36px] md:min-h-[52px] flex flex-col justify-center"
          >
            <div class="text-xs md:text-sm font-medium text-cyan-400 truncate">
              id
            </div>
            <div class="text-xs text-slate-500 mt-0.5 hidden md:block">
              integer
            </div>
          </div>

          <!-- Arrow - Desktop -->
          <div
            class="hidden md:flex items-center justify-center w-32 flex-shrink-0"
          >
            <svg
              class="w-8 h-8 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>

          <!-- Arrow - Mobile -->
          <div
            class="md:hidden flex items-center justify-center w-8 flex-shrink-0"
          >
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>

          <!-- Target Field -->
          <div
            class="flex-1 bg-slate-800/40 border border-slate-600/30 rounded px-2 py-1.5 md:px-4 md:py-2.5 min-h-[36px] md:min-h-[52px] flex flex-col justify-center"
          >
            <div
              class="text-xs md:text-sm font-medium text-emerald-400 truncate"
            >
              invoiceId
            </div>
            <div class="text-xs text-slate-500 mt-0.5 hidden md:block">
              integer
            </div>
          </div>
        </div>

        <!-- Mapping 2: orderNumber -> referenceNumber -->
        <div class="flex items-center gap-3 md:gap-4">
          <div
            class="flex-1 bg-slate-800/40 border border-slate-600/30 rounded px-2 py-1.5 md:px-4 md:py-2.5 min-h-[36px] md:min-h-[52px] flex flex-col justify-center"
          >
            <div class="text-xs md:text-sm font-medium text-cyan-400">
              <span class="md:hidden">orderNum</span>
              <span class="hidden md:inline">orderNumber</span>
            </div>
            <div class="text-xs text-slate-500 mt-0.5 hidden md:block">
              string
            </div>
          </div>

          <div
            class="hidden md:flex items-center justify-center w-32 flex-shrink-0"
          >
            <svg
              class="w-8 h-8 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>

          <div
            class="md:hidden flex items-center justify-center w-8 flex-shrink-0"
          >
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>

          <div
            class="flex-1 bg-slate-800/40 border border-slate-600/30 rounded px-2 py-1.5 md:px-4 md:py-2.5 min-h-[36px] md:min-h-[52px] flex flex-col justify-center"
          >
            <div class="text-xs md:text-sm font-medium text-emerald-400">
              <span class="md:hidden">refNum</span>
              <span class="hidden md:inline">referenceNumber</span>
            </div>
            <div class="text-xs text-slate-500 mt-0.5 hidden md:block">
              string
            </div>
          </div>
        </div>

        <!-- Mapping 3: customerEmail -> customerId (with lookup) -->
        <div class="flex items-stretch gap-3 md:gap-4">
          <div
            class="flex-1 bg-slate-800/40 border border-slate-600/30 rounded px-2 py-1.5 md:px-4 md:py-2.5 min-h-[36px] md:min-h-[52px] flex flex-col justify-center"
          >
            <div class="text-xs md:text-sm font-medium text-cyan-400">
              <span class="md:hidden">custEmail</span>
              <span class="hidden md:inline">customerEmail</span>
            </div>
            <div class="text-xs text-slate-500 mt-0.5 hidden md:block">
              string
            </div>
          </div>

          <!-- Lookup Icon - Desktop -->
          <div
            class="hidden md:flex items-center justify-center w-32 flex-shrink-0"
          >
            <svg
              class="w-8 h-8 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <!-- Lookup Icon - Mobile -->
          <div
            class="md:hidden flex items-center justify-center w-8 flex-shrink-0"
          >
            <svg
              class="w-5 h-5 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div
            class="flex-1 bg-slate-800/40 border border-slate-600/30 rounded px-2 py-1.5 md:px-4 md:py-2.5 min-h-[36px] md:min-h-[52px] flex flex-col justify-center"
          >
            <div class="text-xs md:text-sm font-medium text-emerald-400">
              <span class="md:hidden">custId</span>
              <span class="hidden md:inline">customerId</span>
            </div>
            <div class="text-xs text-slate-500 mt-0.5 hidden md:block">
              integer
            </div>
          </div>
        </div>

        <!-- Mapping 4: isPaid -> paymentStatusId (with custom rule) -->
        <div class="flex items-stretch gap-3 md:gap-4">
          <div
            class="flex-1 bg-slate-800/40 border border-slate-600/30 rounded px-2 py-1.5 md:px-4 md:py-2.5 min-h-[36px] md:min-h-[52px] flex flex-col justify-center"
          >
            <div class="text-xs md:text-sm font-medium text-cyan-400 truncate">
              isPaid
            </div>
            <div class="text-xs text-slate-500 mt-0.5 hidden md:block">
              boolean
            </div>
          </div>

          <!-- Custom Rule Icon - Desktop -->
          <div
            class="hidden md:flex items-center justify-center w-32 flex-shrink-0"
          >
            <svg
              class="w-8 h-8 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <!-- Custom Rule Icon - Mobile -->
          <div
            class="md:hidden flex items-center justify-center w-8 flex-shrink-0"
          >
            <svg
              class="w-5 h-5 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <div
            class="flex-1 bg-slate-800/40 border border-slate-600/30 rounded px-2 py-1.5 md:px-4 md:py-2.5 min-h-[36px] md:min-h-[52px] flex flex-col justify-center"
          >
            <div class="text-xs md:text-sm font-medium text-emerald-400">
              <span class="md:hidden">payStatusId</span>
              <span class="hidden md:inline">paymentStatusId</span>
            </div>
            <div class="text-xs text-slate-500 mt-0.5 hidden md:block">
              integer
            </div>
          </div>
        </div>

        <!-- Mapping 5: total -> amount -->
        <div class="flex items-center gap-3 md:gap-4">
          <div
            class="flex-1 bg-slate-800/40 border border-slate-600/30 rounded px-2 py-1.5 md:px-4 md:py-2.5 min-h-[36px] md:min-h-[52px] flex flex-col justify-center"
          >
            <div class="text-xs md:text-sm font-medium text-cyan-400 truncate">
              total
            </div>
            <div class="text-xs text-slate-500 mt-0.5 hidden md:block">
              decimal
            </div>
          </div>

          <div
            class="hidden md:flex items-center justify-center w-32 flex-shrink-0"
          >
            <svg
              class="w-8 h-8 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>

          <div
            class="md:hidden flex items-center justify-center w-8 flex-shrink-0"
          >
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>

          <div
            class="flex-1 bg-slate-800/40 border border-slate-600/30 rounded px-2 py-1.5 md:px-4 md:py-2.5 min-h-[36px] md:min-h-[52px] flex flex-col justify-center"
          >
            <div
              class="text-xs md:text-sm font-medium text-emerald-400 truncate"
            >
              amount
            </div>
            <div class="text-xs text-slate-500 mt-0.5 hidden md:block">
              decimal
            </div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="mt-8 pt-6 border-t border-slate-700/30">
        <div
          class="flex flex-wrap gap-4 md:gap-6 justify-center text-xs md:text-sm"
        >
          <div class="flex items-center gap-2">
            <svg
              class="w-4 h-4 md:w-5 md:h-5 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <span class="text-slate-400">Direct Mapping</span>
          </div>
          <div class="flex items-center gap-2">
            <svg
              class="w-4 h-4 md:w-5 md:h-5 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span class="text-slate-400">Lookup Table</span>
          </div>
          <div class="flex items-center gap-2">
            <svg
              class="w-4 h-4 md:w-5 md:h-5 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span class="text-slate-400">Custom Rule</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
