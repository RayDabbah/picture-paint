<template>
  <button @click="saveAsImage">Save Your creation!</button>
  <a :download="imgName || 'my-creation'" ref="imgLink" class="img-link"></a>
</template>

<script>
import {ref} from 'vue';

export default {
  name: "SaveAsImage",
  props: {
    imgName: {type: String},
  },
  setup(props) {
    const imgLink = ref(null);

    const saveAsImage = () => {
      const fileExtension = props.imgName ? props.imgName.split('.').pop() : '';
      const fileExtensionType = fileExtension.startsWith('jp') ? 'jpeg' : 'png';
      imgLink.value.href = canvas.toDataURL(`image/${fileExtensionType}`, 1.0);
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