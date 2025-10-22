<template>
  <div class="min-h-screen pt-20 bg-[#0a0a0a] text-white lg:overflow-hidden lg:h-screen">
    <div class="w-full">
      <div class="max-w-[1200px] mx-auto pt-6 pb-4 px-6">
        <div class="relative lg:flex lg:gap-8" style="height: calc(100vh - 7rem);">
          <!-- Left Content Column -->
          <div class="sidebar-panel lg:w-[420px] flex-shrink-0">
            <!-- Header -->
            <div class="mb-6">
              <h1 class="text-xl lg:text-3xl font-bold text-white mb-2">Let's Work Together</h1>
              <p class="text-sm text-gray-400">CTO, full-stack engineer, and technology leader</p>
            </div>

            <!-- Scrollable Content Sections -->
            <div class="space-y-4 overflow-y-auto scrollbar-visible" style="max-height: calc(100vh - 14rem);">
              <!-- Get in Touch -->
              <div class="bg-[#1a1a1a] border-l-4 border-l-cyan-500 border-t border-r border-b border-[#333333] rounded-xl p-4">
                <h2 class="text-base font-bold text-white mb-3">Get in Touch</h2>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <div class="text-xs text-gray-500 mb-0.5">Email</div>
                      <a
                        href="mailto:matt@idevelop.tech"
                        class="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        matt@idevelop.tech
                      </a>
                    </div>
                  </div>

                  <div class="pt-2">
                    <a
                      href="https://calendar.app.google/TJNj8oZNh287aGq27"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="block w-full text-center bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                    >
                      Schedule a Call
                    </a>
                  </div>

                  <div class="flex gap-2">
                    <a
                      href="https://linkedin.com/in/matt-lucian"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex-1 text-center bg-[#0f0f0f] border border-[#333333] hover:border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded-lg text-xs transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/mattlucian"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex-1 text-center bg-[#0f0f0f] border border-[#333333] hover:border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded-lg text-xs transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              <!-- About Me -->
              <div class="bg-[#1a1a1a] border border-[#333333] rounded-xl p-4">
                <h2 class="text-base font-bold text-white mb-3">About Me</h2>
                <div class="space-y-3 text-xs text-gray-300 leading-relaxed">
                  <p>
                    I'm a seasoned CTO and full-stack engineer with over 10 years of experience building
                    and scaling technology solutions. I've successfully grown engineering teams from 5 to 40
                    people while managing $1M+ annual budgets and infrastructure handling billions of monthly transactions.
                  </p>
                  <p>
                    My expertise spans software engineering, cloud architecture (AWS), DevOps practices,
                    platform engineering, and technical leadership. I specialize in helping organizations
                    modernize their technology stack, improve operational efficiency, and scale their teams effectively.
                  </p>
                </div>
              </div>

              <!-- Leadership Experience -->
              <div class="bg-[#1a1a1a] border border-[#333333] rounded-xl p-4">
                <h3 class="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <span class="text-lg">👥</span>
                  Leadership Experience
                </h3>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2 text-xs text-gray-300">
                    <svg class="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Scaled engineering teams 5→40 people</span>
                  </li>
                  <li class="flex items-start gap-2 text-xs text-gray-300">
                    <svg class="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Managed $1M+ annual technology budgets</span>
                  </li>
                  <li class="flex items-start gap-2 text-xs text-gray-300">
                    <svg class="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Led SOC2 compliance implementations</span>
                  </li>
                  <li class="flex items-start gap-2 text-xs text-gray-300">
                    <svg class="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Established engineering processes and culture</span>
                  </li>
                </ul>
              </div>

              <!-- Technical Achievements -->
              <div class="bg-[#1a1a1a] border border-[#333333] rounded-xl p-4">
                <h3 class="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <span class="text-lg">🚀</span>
                  Technical Achievements
                </h3>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2 text-xs text-gray-300">
                    <svg class="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Systems handling billions of transactions</span>
                  </li>
                  <li class="flex items-start gap-2 text-xs text-gray-300">
                    <svg class="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>50% infrastructure cost reduction</span>
                  </li>
                  <li class="flex items-start gap-2 text-xs text-gray-300">
                    <svg class="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Cloud-native architecture design</span>
                  </li>
                  <li class="flex items-start gap-2 text-xs text-gray-300">
                    <svg class="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Full-stack development across multiple languages</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Right Calendar Panel -->
          <div class="content-panel hidden lg:block flex-1">
            <div class="bg-[#1a1a1a] border border-[#333333] rounded-xl h-full overflow-hidden flex flex-col">
              <div class="p-6 border-b border-[#333333]">
                <h2 class="text-2xl font-bold text-white">Schedule a Meeting</h2>
              </div>
              <div class="flex-1 p-4 bg-[#1a1a1a]">
                <div class="h-full bg-white rounded-lg overflow-hidden shadow-lg">
                  <!-- Google Calendar Appointment Scheduling begin -->
                  <iframe
                    src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1VlLHf2G_14dqIt0GI55U5FIohtRTSxyI7nK1zCeeMnBUB3Q755Anh56YeFH4f9I5qf-3uBSdl?gv=true"
                    style="border: 0"
                    width="100%"
                    height="100%"
                    frameborder="0"
                  ></iframe>
                  <!-- end Google Calendar Appointment Scheduling -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Visible scrollbar styling */
.scrollbar-visible::-webkit-scrollbar {
  width: 12px;
}

.scrollbar-visible::-webkit-scrollbar-track {
  background: #0f0f0f;
  border-radius: 0 8px 8px 0;
}

.scrollbar-visible::-webkit-scrollbar-thumb {
  background: #2d2d2d;
  border-radius: 6px;
  border: 2px solid #0f0f0f;
}

.scrollbar-visible::-webkit-scrollbar-thumb:hover {
  background: #3d3d3d;
}
</style>