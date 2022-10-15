<template>
  <cool-header></cool-header>
  <main>
    <!--    flex-col-reverse is for the images reverse-->
    <!--    form 1 2 -->
    <!--    to 2 -->
    <!--       1 -->
    <div
      class="flex flex-col-reverse justify-center m-auto md:max-w-4xl md:flex-row p-4"
    >
      <div class="w-full mr-24 md:w-2/3">
        <h1 class="mt-3 text-3xl text-bold">QR Code generation</h1>
        <p class="mb-4">
          QR Codes allows smart phone users to access your website more easily !
        </p>
        <p>Enter the url below to generate a QR Code !</p>
        <form id="submit" class="mt-4">
          <!--          p-3 in the input is bigger the text area-->
          <!--          outline-none is remove the browser color attach-->
          <input
            type="url"
            class="w-full border-2 mr-2 mb-5 border-gray-600 rounded p-3 focus:outline-none"
            placeholder="Enter Url .."
            v-model="userURL"
          />

          <select
            class="w-full border-2 mr-2 border-gray-600 p-3 rounded focus:outline-none"
            @change="sizeChanged($event)"
          >
            <!--            https://reactgo.com/vue-conditionally-add-attributes/-->
            <option
              v-for="(size, index) in availableSize"
              :key="index"
              :value="size"
              :selected="size === defaultSize"
            >
              {{ size + "x" + size }}
            </option>
          </select>

          <button
            class="bg-gray-400 p-3 w-full mt-4 rounded text-white hover:bg-gray-700 hover:animate-pulse"
            @click.prevent="onGenerate"
          >
            Generate QR code
          </button>
        </form>
      </div>

      <div class="w-full self-center md:w-1/3">
        <img
          src="./assets/logo.svg"
          class="w-full w-1/2 m-auto mb-10 md:w-full"
          alt=""
        />
      </div>
    </div>

    <!--      Generated QR Code-->
    <div
      class="w-full flex flex-col text-center justify-center items-center p-4 mt-20 md:flex-row"
    >
      <!--        Spinner-->
      <img
        v-if="loadingPic"
        src="./assets/icons8-fidget-spinner.gif"
        alt=""
        class="inline"
      />
      <!--        QR out-->
      <div v-if="codeReady">
        <qrcode-vue
          :value="userURL"
          level="M"
          class="m-auto w-full"
          :size="defaultSize"
          id="qrcode"
        />
        <button
          class="bg-gray-400 p-3 w-full mt-4 rounded text-white hover:bg-gray-700 hover:animate-pulse"
          @click.prevent="download_image"
        >
          Download QRCode
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
// col :  |
// Row :  __
// md: when 1200px +
import QrcodeVue from "qrcode.vue";
import CoolHeader from "@/components/layout/cool-header.vue";
import { ref } from "vue";

let defaultSize = ref(300); // need ref to let the code resize automatically
const availableSize = [100, 200, 300, 500, 600, 700, 800, 900];

function sizeChanged(e) {
  console.log(e.target.value);
  defaultSize.value = Number(e.target.value); // change defaultSize
}

const loadingPic = ref(false);
const codeReady = ref(false);

const userURL = ""; // no using ref here to avoid the qrcode not flicker

let currentCounter = "setTimeout";
let currentClickCounter = 0;

function onGenerate() {
  // stop the previous counter
  if (typeof currentCounter === "number") {
    clearTimeout(currentCounter);
    console.log("counter stopped");
  }
  loadingPic.value = true; // stop the previous loading
  codeReady.value = false;

  console.log(currentClickCounter);
  // add click counter
  currentClickCounter++;

  if (currentClickCounter >= 3) {
    alert("Please dont click the button continuously !!");
    // reset the click counter
    currentClickCounter = 0;
    // show the images immediately
    loadingPic.value = false;
    codeReady.value = true;
  }

  // set a time to generate the qrcode , wait about 0.5 seconds
  currentCounter = setTimeout(() => {
    // https://stackoverflow.com/questions/21553547/how-to-clear-timeout-in-javascript
    loadingPic.value = false;
    codeReady.value = true;
    console.log("counter start");
    // reset the click counter
    currentClickCounter = 0;
  }, 500);
}

function download_image() {
  // Dump the canvas contents to a file.
  let canvas = document.getElementById("qrcode");
  let img = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = img;
  link.download = "qrcode.png";
  link.click();
}
</script>

<style scoped></style>
