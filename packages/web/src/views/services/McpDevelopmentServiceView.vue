<script setup lang="ts">
import { useServiceMeta } from "@/composables/useServiceMeta";
import { getFeaturedArticle } from "@/data/articles";
import ServicePageLayout from "../../components/layout/ServicePageLayout.vue";
import McpFlowDiagram from "../../components/mcp/McpFlowDiagram.vue";
import AgentChatDemo from "../../components/mcp/AgentChatDemo.vue";
import McpBuildingBlocks from "../../components/mcp/McpBuildingBlocks.vue";
import McpRequestPatterns from "../../components/mcp/McpRequestPatterns.vue";
import McpScopeLadder from "../../components/mcp/McpScopeLadder.vue";
import McpBuildProcess from "../../components/mcp/McpBuildProcess.vue";
import { mcpDevelopmentServiceData } from "@/data/services/mcp-development";

// SEO Meta Tags
useServiceMeta({
  serviceName: "MCP Servers: Open Your Platform to AI Agents",
  slug: "mcp-development",
  description:
    "Model Context Protocol (MCP) server development for platforms. Built on your existing APIs and authentication, so your customers can use your platform through AI agents like Claude and ChatGPT.",
  ogDescription:
    "Let your customers use your platform through AI agents. MCP servers with secure sign-in, tools built on your existing API, and documentation written for agents.",
});

const featuredArticle = getFeaturedArticle("/services/mcp-development");
</script>

<template>
  <ServicePageLayout
    :page="mcpDevelopmentServiceData"
    service-name="MCP Server Development"
    :featured-article="featuredArticle"
  >
    <McpFlowDiagram />
    <AgentChatDemo />
    <McpBuildingBlocks />
    <McpRequestPatterns :patterns="mcpDevelopmentServiceData.requestPatterns" />
    <McpScopeLadder />
    <McpBuildProcess />
  </ServicePageLayout>
</template>
