<template>
  <input
    class="w-full my-2 border-2 border-gray-600 rounded p-2 focus:outline-none"
    :placeholder="placeholder"
    :value="inputs"
    @change.prevent="emitter($event)"
  />
</template>

<script setup>
defineProps({
  placeholder: {
    type: String,
    required: true,
    description: "Placeholder for the input element ..",
  },
  // v-model handler
  inputs: {
    type: String,
    required: true,
    description: "content fot the input element ..",
  },
});
const emits = defineEmits(["update:inputs"]);

function emitter(e) {
  console.log("emit >😗", e.target.value);
  emits("update:inputs", e.target.value);
}
</script>
