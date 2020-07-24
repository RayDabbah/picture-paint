<template>
    <div class="picker" ref="picker">Click Here To Show</div>
</template>

<script>
    import Picker from "vanilla-picker";
    import {onMounted, ref} from 'vue';

    export default {
        name: "ColorPicker",
        setup(props, {emit}) {
            const picker = ref(null)
            onMounted(() => {
                new Picker({
                    alpha: false,
                    parent: picker.value, onChange: color => emit('change', color.hex)

                })
            });
            return {picker}
        },
    }
</script>

<style scoped>

</style>