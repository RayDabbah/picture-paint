<template>
    <div class="top-bar"></div>
    <canvas @mousedown="setPos"
            @mouseenter="setPos"
            @mousemove="drawLine"
            ref="canvas"
            class="canvas"
    ></canvas>
</template>

<script>
    import {ref, onMounted, } from 'vue';
    import {resize, draw, setPosition} from "./draw";

    export default {
        name: 'App',
        setup() {
            const canvas = ref(null);
            let ctx;
            let pos = {x: 0, y: 0};
            const drawLine = e => draw(ctx, e, pos);
            const setPos = e => setPosition(pos, e)

            onMounted(() => {
                ctx = canvas.value.getContext('2d');
                resize(ctx);
                window.addEventListener("resize", () => resize(ctx));
            })

            return {
                canvas, drawLine, setPos,
            }
        },
    }
</script>
<style scoped>
    .canvas{
        border-radius: 3px;
        border: 1px black solid;
    }
</style>