<template>
    <div class="top-bar">
        <SaveAsImage />

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
                   @change="e => setImage(e)"
                   type="file"/>
        </label>

        <ColorPicker label="Select a background color" initialColor="#ffffff" @change="setBackground"/>
    </div>
    <canvas @mousedown="setPos"
            @mouseenter="setPos"
            @mousemove="drawLine"
            id="canvas"
            class="canvas"
            :width="canvasSize.width"
            :height="canvasSize.height"
    ></canvas>
</template>

<script>
    import {ref, onMounted, reactive,} from 'vue';
    import {draw, setPosition, setBackground, setImage} from "./draw";
    import ColorPicker from "./components/ColorPicker.vue";
    import SaveAsImage from "./components/SaveAsImage.vue";

    export default {
        name: 'App',
        setup() {

            const picker = ref()

            const config = reactive({width: 1})

            let pos = {x: 0, y: 0};

            const drawLine = e => draw(e, pos, config);

            const setPos = e => setPosition(pos, e);

            const changeWritingColor = color => config.color = color;

            const canvasSize = {width: window.innerWidth - 52, height: window.innerHeight - 100};

            const clearCanvas = () => {
                canvas.width = canvasSize.width;
                canvas.height = canvasSize.height;
            }

            onMounted(() => {
                window.canvas = document.getElementById('canvas');
                window.ctx = canvas.getContext('2d');
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height)


            })

            return {
                drawLine,
                setPos,
                config,
                picker,
                changeWritingColor,
                canvasSize,
                setBackground,
                setImage,
                clearCanvas,
            }
        },
        components: {
            ColorPicker, SaveAsImage,
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