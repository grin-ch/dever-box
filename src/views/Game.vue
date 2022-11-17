<template>
  <n-layout has-sider>
    <n-layout-sider content-style="padding: 24px;">
      <n-anchor>
        <n-anchor-link title="扫雷"> </n-anchor-link>
      </n-anchor>
    </n-layout-sider>
    <n-layout-content>
      <mine-sweeping :width="30" :heigth="20" :num="125" />
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NAnchor,
  NAnchorLink,
} from "naive-ui";
import MineSweeping from "../components/game/MineSweeping.vue";
</script>
