<script setup lang="ts">
import { ref } from "vue";
import { CheckCircleIcon, PlayCircleIcon } from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";
import VideoEmbed from "../ui/VideoEmbed.vue";
import { videoThumbnail } from "@/utils/imageAssets";

const thumbnail = videoThumbnail("flxpoint-mcp-in-practice.jpg");

const chapters = [
  {
    time: "0:53",
    seconds: 53,
    label: "Listing dashboard with a scheduled refresh",
  },
  { time: "4:57", seconds: 297, label: "Order dashboard from current data" },
  { time: "8:48", seconds: 528, label: "Listing reconciliation automation" },
  { time: "16:23", seconds: 983, label: "ASIN mapping, then bulk publish" },
  { time: "18:02", seconds: 1082, label: "Order fulfillment alerts in Slack" },
];

const help = [
  "Team training on asking AI about orders, listings, and shipping",
  "Dashboards and reports built from your Flxpoint data",
  "Automations that act on what the agent finds",
];

const video = ref<InstanceType<typeof VideoEmbed> | null>(null);
</script>

<template>
  <ContentSection
    id="mcp"
    title="Using the Flxpoint MCP Server"
    subtitle="Training and custom workflows for teams connecting Flxpoint to Claude and other AI agents."
  >
    <div class="grid gap-8 lg:grid-cols-5">
      <div class="lg:col-span-3">
        <VideoEmbed
          ref="video"
          video-id="YS4fHChunek"
          title="Flxpoint MCP in practice: 5 real workflows with Claude"
          :thumbnail="thumbnail.logo"
          :thumbnail-webp="thumbnail.logoWebp"
        />
        <p class="mt-3 text-sm text-slate-400">
          Recorded for Flxpoint and featured on the
          <a
            href="https://flxpoint.com/flxpoint-mcp"
            target="_blank"
            rel="noopener noreferrer"
            class="text-cyan-400 transition-colors hover:text-cyan-300"
            >Flxpoint MCP page</a
          >. The video loads from YouTube when you press play.
        </p>
      </div>

      <div class="space-y-6 lg:col-span-2">
        <div>
          <h3
            class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Workflows in the video
          </h3>
          <ol class="space-y-1">
            <li v-for="chapter in chapters" :key="chapter.seconds">
              <button
                type="button"
                class="group flex w-full cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-slate-800/50"
                @click="video?.play(chapter.seconds)"
              >
                <PlayCircleIcon
                  class="h-5 w-5 shrink-0 text-slate-600 transition-colors group-hover:text-cyan-400"
                />
                <span class="flex-1 text-slate-300">{{ chapter.label }}</span>
                <span class="font-mono text-xs text-slate-500">{{
                  chapter.time
                }}</span>
              </button>
            </li>
          </ol>
        </div>

        <div>
          <h3
            class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            How I help
          </h3>
          <ul class="space-y-2">
            <li
              v-for="item in help"
              :key="item"
              class="flex items-start gap-2 text-sm text-slate-300"
            >
              <CheckCircleIcon class="h-5 w-5 shrink-0 text-cyan-400" />
              {{ item }}
            </li>
            <li class="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircleIcon class="h-5 w-5 shrink-0 text-cyan-400" />
              <span>
                <router-link
                  to="/services/mcp-development"
                  class="text-cyan-400 transition-colors hover:text-cyan-300"
                  >Custom MCP tools</router-link
                >
                for needs the Flxpoint server doesn't cover
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </ContentSection>
</template>
