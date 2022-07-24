<template>
  <n-message-provider>
    <MessageApi />
  </n-message-provider>
  <HelloWorld msg="Vite + Vue" />
</template>

<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
import MessageApi from "./components/message-api.vue";
import HelloWorld from "./components/HelloWorld.vue";
</script>
