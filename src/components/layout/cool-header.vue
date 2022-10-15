<template>
  <header class="mb-10 p-4 bg-red-400">
    <div class="max-w-2xl mx-auto">
      <div class="text-bold text-xl text-white">
        {{ title }}
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
    default: "Default Title",
  },
});
</script>

<style scoped></style>
