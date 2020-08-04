<template>
    <button @click="saveAsImage">Save Your creation!</button>
    <a download ref="imgLink" class="img-link"></a>
</template>

<script>
    import {ref} from 'vue';

    export default {
        name: "SaveAsImage",

        setup() {
            const imgLink = ref(null);

            const saveAsImage = () => {
                imgLink.value.href = canvas.toDataURL('image/png');
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