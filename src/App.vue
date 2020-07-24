<template>
    <div class="top-bar">
        <label>Line Width: {{ config.width }}px<input min="1" v-model="config.width" type="range"/></label>
        <ColorPicker  @change="changeColor" id="picker">Click To Pick a color</ColorPicker>
    </div>
    <canvas @mousedown="setPos"
            @mouseenter="setPos"
            @mousemove="drawLine"
            ref="canvas"
            class="canvas"
    ></canvas>
</template>

<script>
    import {ref, onMounted, reactive, watch} from 'vue';
    import {resize, draw, setPosition} from "./draw";
    import ColorPicker from "./components/ColorPicker.vue";

    export default {
        name: 'App',
        setup() {
            const canvas = ref(null);
            let ctx;
            const picker = ref()
            const config = reactive({width: 3})
            let pos = {x: 0, y: 0};
            const drawLine = e => draw(ctx, e, pos, config);
            const setPos = e => setPosition(pos, e);
            const changeColor = color => config.color = color;

            onMounted(() => {
                ctx = canvas.value.getContext('2d');

                resize(ctx);
            })

            watch(() => config.color, console.log)

            return {
                canvas, drawLine, setPos, config, picker, changeColor
            }
        },
        components:{
            ColorPicker
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