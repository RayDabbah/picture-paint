<template>
    <div class="top-bar">
        <SaveAsImage :canvas="canvas"/>
        <label>Line Width: {{ config.width }}px<input min="1" v-model="config.width" type="range"/></label>
        <ColorPicker @change="changeWritingColor"/>
        <ColorPicker @change="canvasBackground"/>
    </div>
    <canvas @mousedown="setPos"
            @mouseenter="setPos"
            @mousemove="drawLine"
            ref="canvas"
            class="canvas"
            :width="canvasSize.width"
            :height="canvasSize.height"
    ></canvas>
</template>

<script>
    import {ref, onMounted, reactive, watch} from 'vue';
    import {draw, setPosition, setBackground} from "./draw";
    import ColorPicker from "./components/ColorPicker.vue";
    import SaveAsImage from "./components/SaveAsImage.vue";

    export default {
        name: 'App',
        setup() {
            const canvas = ref(null);
            let ctx = ref();
            const picker = ref()
            const config = reactive({width: 1})
            let pos = {x: 0, y: 0};
            const drawLine = e => draw(ctx, e, pos, config);
            const setPos = e => setPosition(pos, e);
            const changeWritingColor = color => config.color = color;

            const canvasSize = {width: window.innerWidth - 52, height: window.innerHeight - 100};

            const canvasBackground = setBackground(ctx, canvas);

            onMounted(() => {
                ctx.value = canvas.value.getContext('2d');
                ctx.value.fillStyle = '#ffffff';
                ctx.value.fillRect(0,0,canvas.value.width, canvas.value.height)


            })

            // watch(() => config.color, console.log)

            return {
                canvas, drawLine, setPos, config, picker, changeWritingColor, canvasSize, canvasBackground
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
        padding: 1rem;
        border: 1px grey solid;
        margin: .5rem;
    }
</style>