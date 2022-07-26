<template>
  <h1>hello world</h1>
  <n-button circle :dashed="false" type="info" quaternary v-on:click="onclick">
    <template #icon>
      <n-icon><Thumbs /></n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import { ThumbsUpOutline as Thumbs } from "@vicons/ionicons5";

const onclick = () => {
  window.$message.info("点赞");
};
</script>
