<template>
  <div class="top-bar">
    <SaveAsImage :img-name="imageName"/>

    <button @click="undo">Undo</button>

    <button class="clear-button" @click="clearCanvas">
      Clear
    </button>
    <label>
      Line Width: {{ config.width }}px
      <input min="1" v-model="config.width" type="range"/>
    </label>

    <ColorPicker initialColor="#000000ff" label="Select a color for writing" @change="changeWritingColor"/>

    <label class="file-input-label">
      Upload an Image &nbsp;
      <input class="file-input"
             accept="image/png, image/jpeg"
             @change="imageDialog"
             type="file"/>
    </label>

    <ColorPicker label="Select a background color" initialColor="#ffffff" @change="setBackground"/>
  </div>
  <canvas @mousedown="setPosition"
          @mouseenter="setPosition"
          @mousemove="drawLine"
          id="canvas"
          class="canvas"
          :width="canvasSize.width"
          :height="canvasSize.height"
  ></canvas>

  <FullModal @no="showRedrawModal = false"
             @yes="redrawAndClose"
             text="Would you like to place your drawing on top of this picture?"
             :open="showRedrawModal"/>

</template>

<script>
import {ref, onMounted, reactive} from 'vue';
import {draw, setPosition, setBackground, setImage,} from "./draw";
import {undo, redraw, trackAction} from './trackDrawings';
import ColorPicker from "./components/ColorPicker.vue";
import SaveAsImage from "./components/SaveAsImage.vue";
import FullModal from "./components/FullModal.vue";

export default {
  name: 'App',
  setup() {

    const picker = ref()

    const imageName = ref(null)

    const config = reactive({width: 1})

    const showRedrawModal = ref(false)


    const drawLine = e => draw(e, config);

    const changeWritingColor = color => config.color = color;

    const canvasSize = {width: window.innerWidth - 52, height: window.innerHeight - 100};

    const imageDialog = e => {
      imageName.value = setImage(e);
      showRedrawModal.value = true;
    }

    const redrawAndClose = () => {
      redraw(false);
      showRedrawModal.value = false;
    }

    const clearCanvas = () => trackAction(() => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      imageName.value = '';
    })

    onMounted(() => {
      window.canvas = document.getElementById('canvas');
      window.ctx = canvas.getContext('2d');
      window.pos = {x: 0, y: 0};
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height)


    })

    return {
      drawLine,
      setPosition,
      config,
      picker,
      changeWritingColor,
      canvasSize,
      setBackground,
      imageDialog,
      clearCanvas,
      undo,
      imageName,
      showRedrawModal,
      redrawAndClose,
    }
  },
  components: {
    ColorPicker, SaveAsImage, FullModal,
  }
}
</script>
<style scoped>
.canvas {
  border-radius: 3px;
  border: 1px black solid;
}

.top-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  border: 1px grey solid;
  margin: .5rem;
}

.file-input-label {
  cursor: pointer;
}

.file-input-label {
  background: blue;
}

.file-input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.clear-button {
  background: orange;
}
</style>