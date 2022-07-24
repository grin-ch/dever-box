<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <button type="button" @click="info('' + count++)">
    count is {{ count }}
  </button>
</template>

<script lang="ts">
export default {
  methods: {
    info(msg: string) {
      window.$message.info(msg);
    },
  },
};
</script>
