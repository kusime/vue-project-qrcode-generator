import { defineStore } from "pinia";

const qrcodeStore = defineStore("qrcode", {
  state: () => ({
    codeReady: false,
    value: "",
    defaultSize: 300, // need ref to let the code resize automatically
    availableSize: [100, 200, 300, 500, 600, 700, 800, 900],
    clickCount: 0,
    currentTimer: "setTimeout id",
    showSpinner: false,
  }),
  actions: {
    reset() {
      // this.value = ""; // not used here since the value is not reactive in the APP.vue
      this.showSpinner = false;
      this.codeReady = false;
      this.clickCount = 0;
    },
    selectHandler(selected) {
      console.log(selected, typeof selected);
      this.defaultSize = selected;
    },
    stopTimer(timerID) {
      if (typeof timerID === "number") {
        clearTimeout(timerID);
        console.log("counter stopped");
      }
    },
    onGenerate() {
      console.log(this.clickCount);
      this.codeReady = false;
      this.showSpinner = true;
      this.stopTimer(this.currentTimer);

      this.clickCount++;

      if (this.clickCount >= 3) {
        alert("Please dont click the button continuously !!");
        // reset the click counter
        this.clickCount = 0;
        // show the images immediately
        this.codeReady = true;
        this.showSpinner = false;
      }

      // set a time to generate the qrcode , wait about 0.5 seconds
      this.currentTimer = setTimeout(() => {
        // https://stackoverflow.com/questions/21553547/how-to-clear-timeout-in-javascript
        this.codeReady = true;
        this.showSpinner = false;
        console.log("counter start");
        // reset the click counter
        this.clickCount = 0;
      }, 500);
    },
    download_image() {
      // Dump the canvas contents to a file.
      let canvas = document.getElementById("qrcode");
      let img = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = img;
      link.download = "qrcode.png";
      link.click();
    },
  },
});

export default qrcodeStore;
