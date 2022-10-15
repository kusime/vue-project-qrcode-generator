<template>
  <select
    class="w-full p-3 border-2 border-gray-600 rounded focus:outline-none"
    @change="onSelectChange($event)"
  >
    <!--            https://reactgo.com/vue-conditionally-add-attributes/-->
    <option
      v-for="(size, index) in units"
      :key="index"
      :value="size"
      :selected="size === defaultSize"
    >
      {{ size + "x" + size }}
    </option>
  </select>
</template>

<script setup>
const props = defineProps({
  units: {
    type: Array,
    required: true,
    default: () => [],
  },
  defaultSize: {
    // https://blog.csdn.net/feiying0canglang/article/details/122382166
    type: Number,
    required: true,
    default: 100,
  },
});
const emits = defineEmits(["change"]);

function onSelectChange(e) {
  console.log(`onSelectChange>${e.target.value}`);
  let selected = e.target.value;
  if (typeof props.defaultSize == "number") {
    selected = Number(selected);
  }

  // bad implementation for single data flow
  // props.defaultSize.value = Number(e.target.value); // change defaultSize
  emits("change", selected);
}
</script>

<style scoped></style>
