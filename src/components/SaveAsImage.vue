<template>
    <button @click="saveAsImage">Save Your creation!</button>
    <a download ref="imgLink" class="img-link"></a>
</template>

<script>
    import {ref} from 'vue';

    export default {
        name: "SaveAsImage",
        props: {
            canvas: HTMLCanvasElement,
        },
        setup(props, {emit}) {
            const imgLink = ref(null)

            const saveAsImage = () => {
                imgLink.value.href = props.canvas.toDataURL('image/png');
                imgLink.value.click();
            };
            return {imgLink, saveAsImage}
        }
    }
</script>

<style scoped>
    .img-link {
        display: none;
    }
</style>