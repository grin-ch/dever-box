<template>
  <n-menu
    v-model:value="activeKey"
    mode="horizontal"
    :options="menuOptions"
    :default-value="defaultPath"
  />
</template>

<script lang="ts">
import { defineComponent, ref, h, Component } from "vue";
import { NMenu, NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
import {
  HomeOutline as Home,
  GameControllerOutline as Game,
  InformationCircleOutline as Info,
} from "@vicons/ionicons5";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "home",
          },
        },
        { default: () => "home" }
      ),
    key: "home",
    icon: renderIcon(Home),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/game",
          },
        },
        { default: () => "game" }
      ),
    key: "game",
    icon: renderIcon(Game),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/about",
          },
        },
        { default: () => "about" }
      ),
    key: "about",
    icon: renderIcon(Info),
  },
];

export default defineComponent({
  components: {
    NMenu,
  },
  setup() {
    return {
      defaultPath: "Home",
      menuOptions,
      activeKey: ref<string | null>(null),
    };
  },
});
</script>
