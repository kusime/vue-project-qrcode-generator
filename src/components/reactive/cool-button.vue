<template>
  <button
    class="w-full border-2 border-gray-600 rounded focus:outline-none mt-2 p-3 bg-gray-500 hover:bg-gray-700 hover:animate-pulse"
    @click.prevent="clickHandler"
  >
    {{ promptText }}
  </button>
</template>

<script setup>
const emits = defineEmits(["click"]);
const props = defineProps({
  promptText: {
    type: String,
    required: true,
    default: "Button",
  },
});
function clickHandler() {
  console.log(props.promptText, "is clicked ");
  emits("click", clickHandler + "Clicked");
}
</script>

<style scoped></style>
