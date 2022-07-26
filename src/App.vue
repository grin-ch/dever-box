<template>
  <nav-bar class="nav-bar" />
  <div>
    <n-message-provider>
      <MessageApi />
      <router-view />
    </n-message-provider>
  </div>
</template>

<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
import NavBar from "./components/NavBar.vue";
import MessageApi from "./components/message-api.vue";
</script>

<style scoped>
#app {
  max-width: 100%;
}
</style>
