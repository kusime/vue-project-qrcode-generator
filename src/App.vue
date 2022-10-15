<template>
  <cool-header title="QRCode Generator"></cool-header>
  <main>
    <!--    flex-col-reverse is for the images reverse-->
    <!--    form 1 2 -->
    <!--    to 2 -->
    <!--       1 -->
    <cool-container>
      <template #div1>
        <h1 class="mt-3 text-3xl text-bold">QR Code generation</h1>
        <p class="mb-4">
          QR Codes allows smart phone users to access your website more easily !
        </p>
        <p>Enter the url below to generate a QR Code !</p>
        <form id="submit" @submit.prevent class="mt-4">
          <!--          v-model:input="ref('')"-->
          <!--          v-model just can work with the ref() to make the emit value to being caught-->
          <!--alternative , you can wrapping the value in an object , so the vue dont auto unpacking the value which treated the value-->
          <!--          as a Proxy by default-->
          <cool-input
            v-model:inputs="value"
            placeholder="Enter your URL ..."
          ></cool-input>

          <!--          if not using v-bind here 300 will treated as an string-->
          <cool-select
            @change="qrcode.selectHandler"
            :default-size="defaultSize"
            :units="availableSize"
          ></cool-select>

          <cool-button
            prompt-text="Generate QRCode"
            @click="qrcode.onGenerate"
          ></cool-button>
        </form>
      </template>

      <template #div2>
        <cool-logo></cool-logo>
        <cool-button
          prompt-text="RESET QRCode"
          @click="qrcode.reset"
        ></cool-button>
      </template>
    </cool-container>

    <!--      Generated QR Code-->

    <div class="flex flex-col w-full p-5 mt-2 justify-center items-center">
      <normal-container :controller="showSpinner">
        <cool-spinner></cool-spinner>
      </normal-container>

      <normal-container :controller="codeReady">
        <qrcode-vue
          :value="value"
          level="M"
          class="m-auto w-full"
          :size="defaultSize"
          id="qrcode"
        />
        <cool-button
          prompt-text="Download QRCode"
          @click="qrcode.download_image"
        ></cool-button>
      </normal-container>
    </div>
  </main>
</template>

<script setup>
// col :  |
// Row :  __
// md: when 1200px +
import QrcodeVue from "qrcode.vue";
import CoolHeader from "@/components/layout/cool-header.vue";
import CoolContainer from "@/components/layout/cool-container.vue";
import CoolLogo from "@/components/icons/cool-logo.vue";
import CoolInput from "@/components/reactive/cool-input.vue";
import CoolSelect from "@/components/reactive/cool-select.vue";
import CoolButton from "@/components/reactive/cool-button.vue";
import NormalContainer from "@/components/layout/normal-container.vue";
import CoolSpinner from "@/components/icons/cool-spinner.vue";
import qrcodeStore from "@/stores/qrcode.js";
import { storeToRefs } from "pinia";

const qrcode = qrcodeStore();
const { codeReady, defaultSize, availableSize, showSpinner } =
  storeToRefs(qrcode);
// value will cause the flicker is use storeToRefs,so just use property to avoid flicker
const value = qrcode.value;
</script>

<style scoped></style>
