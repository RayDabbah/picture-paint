<template>
  <div v-if="open" class="overlay">
    <div class="modal">
      <div class="content">{{ text }}</div>
      <div class="button-wrapper">
        <button @click="$emit('yes')">Yes</button>
        <button @click="$emit('no')">No</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "FullModal",
  props: {
    text: String,
    open: Boolean,
  },
  
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #00000033;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 3rem 10rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 35%;
  box-shadow: #00000044 10px 10px 20px;
}

button {
  background: coral;
}

.button-wrapper {
  display: flex;
  justify-content: space-between;
  width: 10rem;
}
</style>