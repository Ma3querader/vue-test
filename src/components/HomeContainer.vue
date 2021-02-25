<template>
  <div class="home-container">
    <mt-swipe :auto="500">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.home-container {
  height: 200px;
}
</style>