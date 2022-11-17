<template>
  <n-message-provider>
    <MessageApi />
  </n-message-provider>
  <n-layout>
    <n-layout-header>
      <nav-bar class="nav-bar" />
    </n-layout-header>
    <n-layout-content
      content-style="width:80%; margin:0 auto; padding-top:24px;"
    >
      <router-view />
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import {
  NMessageProvider,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
} from "naive-ui";
import NavBar from "./components/global/NavBar.vue";
import MessageApi from "./components/global/message-api.vue";
</script>

<style scoped>
#app {
  max-width: 100%;
}
</style>
