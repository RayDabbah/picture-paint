<template>
  <div :style="{background: selectedColor || '#000000' }" ref="picker" class="picker">
    <span class="picker-text">{{ label }}</span></div>
</template>

<script>
import Picker from "vanilla-picker";
import {onMounted, ref} from 'vue';

export default {
  name: "ColorPicker",
  props: {
    label: String,
    initialColor: String,
  },
  setup(props, {emit}) {
    const picker = ref(null);
    const selectedColor = ref(null);

    onMounted(() => {
      new Picker({
        alpha: false,
        cancelButton: true,
        color: props.initialColor,
        popup: 'bottom',
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
  border: 1px solid black;
}

.picker-text {
  mix-blend-mode: difference;
  color: white;
}
</style>