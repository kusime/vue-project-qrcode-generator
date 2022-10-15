<template>
  <!-- !! md:max-w-4xl is a key for the items being centered-->
  <div
    class="w-full md:max-w-4xl m-auto p-4 flex flex-col-reverse justify-center items-center md:flex-row"
  >
    <div
      class="w-full md:max-w-2/3 flex-col flex justify-center items-center md:mr-24"
    >
      <slot name="div1"></slot>
    </div>

    <div class="md:max-w-1/3 md:w-1/2 flex-col flex">
      <slot name="div2"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
