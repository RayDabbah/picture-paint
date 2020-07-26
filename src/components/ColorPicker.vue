<template>
    <div :style="{background: selectedColor || '#000000' }" ref="picker" class="picker">
        <span class="picker-text">Click Here To Select a color!</span></div>
</template>

<script>
    import Picker from "vanilla-picker";
    import {onMounted, ref} from 'vue';

    export default {
        name: "ColorPicker",
        setup(props, {emit}) {
            const picker = ref(null);
            const selectedColor = ref(null);

            onMounted(() => {
                new Picker({
                    alpha: false,
                    parent: picker.value, onChange: color => {
                        emit('change', color.hex);
                        selectedColor.value = color.hex;
                    }

                })
            });
            return {picker, selectedColor}
        },
    }
</script>

<style scoped>
    .picker {
        padding: .75rem;
        border-radius: 10px;
        cursor: pointer;
        transition: 300ms;
    }

    .picker:hover {
        opacity: .75;
        transform: scale(1.01);
    }

    .picker-text {
        mix-blend-mode: difference;
        color: white;
    }
</style>