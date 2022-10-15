<template>
  <div v-show="controller">
    <slot name="default"></slot>
  </div>
</template>

<script setup>
defineProps({
  controller: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped></style>
